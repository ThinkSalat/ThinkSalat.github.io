import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Spotify playlist tracks are sourced at build time instead of copied into the repository', async () => {
  const source = await readFile(new URL('../src/data/spotify.ts', import.meta.url), 'utf8');

  assert.match(source, /getSpotifyPlaylist/);
  assert.match(source, /__NEXT_DATA__/);
  assert.doesNotMatch(source, /Everybody Loves The Sunshine|Inspiration Information|Shuggie Otis/);
});
