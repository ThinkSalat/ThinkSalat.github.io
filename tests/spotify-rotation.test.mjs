import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

class FakeClassList {
  values = new Set();
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  toggle(name, force) {
    const enabled = force ?? !this.values.has(name);
    if (enabled) this.values.add(name);
    else this.values.delete(name);
    return enabled;
  }
  contains(name) { return this.values.has(name); }
}

function fakeElement(dataset = {}) {
  const element = {
    animations: [],
    attributes: new Map(),
    children: [],
    classList: new FakeClassList(),
    dataset: { ...dataset },
    disabled: false,
    hidden: false,
    listeners: new Map(),
    offsetHeight: 40,
    offsetTop: 0,
    scrollCalls: [],
    scrollTop: 0,
    src: '',
    textContent: '',
    addEventListener(type, callback) { this.listeners.set(type, callback); },
    animate(frames, options) { const animation = { frames, options }; this.animations.push(animation); return animation; },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    scrollTo(options) { this.scrollTop = options.top; this.scrollCalls.push(options); },
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
  };
  Object.defineProperty(element, 'firstElementChild', { get: () => element.children[0] ?? null });
  return element;
}

test('homepage promotes the complete five-row Spotify reel with working previews', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const script = html.match(/<script>\(function\(\)\{const spotifyPlaylist.*?<\/script>/s)?.[0]
    ?.replace(/^<script>/, '')
    .replace(/<\/script>$/, '');
  assert.ok(script, 'generated Spotify script is present');

  const playlistMarkup = html.match(/<ol[^>]*data-spotify-list[^>]*>.*?<\/ol>/s)?.[0] ?? '';
  const renderedRowCount = (playlistMarkup.match(/data-spotify-row/g) ?? []).length;
  const loopRowCount = (playlistMarkup.match(/data-loop-clone/g) ?? []).length;
  const playlistTrackCount = renderedRowCount - loopRowCount;
  assert.ok(playlistTrackCount > 10, 'the complete remotely sourced playlist is rendered');
  assert.equal(loopRowCount, 4, 'four inaccessible rows preserve the five-row wrap transition');
  assert.match(html, /five visible at once/);
  assert.doesNotMatch(html, /spotify-progress|PLAYING/);

  const revealButton = fakeElement();
  revealButton.setAttribute('aria-expanded', 'false');
  const toggle = fakeElement();
  toggle.textContent = 'Pause rotation';
  toggle.setAttribute('aria-label', 'Pause rotating tracks');
  const rows = Array.from({ length: renderedRowCount }, (_, index) => {
    const row = fakeElement({ trackIndex: String(index % playlistTrackCount) });
    row.offsetTop = index * row.offsetHeight;
    return row;
  });
  const trackList = fakeElement();
  trackList.children = rows;
  const trackWindow = fakeElement();
  const previewUrl = 'https://p.scdn.co/mp3-preview/test-preview';
  const playButtons = [
    fakeElement({ preview: previewUrl, trackId: 'track-1', trackTitle: 'Test track' }),
    fakeElement({ preview: 'https://p.scdn.co/mp3-preview/second-preview', trackId: 'track-2', trackTitle: 'Second track' }),
  ];
  const audio = fakeElement();
  Object.assign(audio, {
    currentTime: 0,
    paused: true,
    pause() { this.paused = true; this.listeners.get('pause')?.(); },
    async play() { this.paused = false; this.listeners.get('play')?.(); },
  });
  const strip = fakeElement();
  strip.hidden = true;
  strip.querySelector = (selector) => ({
    '[data-spotify-toggle]': toggle,
    '[data-spotify-window]': trackWindow,
    '[data-spotify-list]': trackList,
    '[data-spotify-audio]': audio,
  })[selector] ?? null;
  strip.querySelectorAll = (selector) => selector === '[data-spotify-audio-toggle]' ? playButtons : [];

  let timerId = 0;
  const timers = [];
  const window = {
    clearTimeout(id) { const timer = timers.find((candidate) => candidate.id === id); if (timer) timer.cleared = true; },
    setTimeout(callback, delay) { const timer = { id: ++timerId, callback, delay, cleared: false }; timers.push(timer); return timer.id; },
  };
  const document = { querySelector: (selector) => selector === '[data-music-reveal]' ? revealButton : strip };

  vm.runInNewContext(script, { document, window });

  assert.equal(timers.length, 0, 'rotation waits until the visitor opens the disclosure');
  revealButton.listeners.get('click')();
  const rotationTimer = timers.findLast((timer) => timer.delay === 5000 && !timer.cleared);
  assert.ok(rotationTimer, 'opening the capsule starts rotation');
  rotationTimer.callback();
  assert.equal(trackWindow.scrollCalls.at(-1).top, rows[1].offsetTop);
  assert.equal(trackWindow.scrollCalls.at(-1).behavior, 'smooth', 'automatic rotation preserves the scrolling transition');

  await playButtons[0].listeners.get('click')();
  assert.equal(audio.src, previewUrl, 'the selected track preview is loaded');
  assert.equal(audio.paused, false, 'the explicit play action starts audio');
  assert.equal(playButtons[0].classList.contains('is-playing'), true);
  assert.equal(toggle.textContent, 'Resume rotation', 'playing audio stops playlist rotation');
  await playButtons[0].listeners.get('click')();
  assert.equal(audio.paused, true, 'clicking the active track stops audio');
});

test('Spotify integration ships without the prototype route or embedded player SDK', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.equal(html.includes('embed/iframe-api'), false);
  assert.equal(html.includes('data-spotify-player'), false);
  await assert.rejects(readFile(new URL('../dist/prototype/spotify/index.html', import.meta.url)), { code: 'ENOENT' });
});
