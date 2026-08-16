const playlistId = '5NseJEWasgnAuI5cpjk3eC';
const playlistHref = `https://open.spotify.com/playlist/${playlistId}`;
const embedHref = `https://open.spotify.com/embed/playlist/${playlistId}`;

export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  image: string;
  preview: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  href: string;
  tracks: SpotifyTrack[];
}

interface EmbedTrack {
  uri?: string;
  title?: string;
  subtitle?: string;
  audioPreview?: { url?: string };
}

interface EmbedEntity {
  id?: string;
  title?: string;
  coverArt?: { sources?: Array<{ url?: string; width?: number }> };
  trackList?: EmbedTrack[];
}

let playlistPromise: Promise<SpotifyPlaylist> | undefined;

async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'shawnsalat.com static site build' },
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) throw new Error(`Spotify returned HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }

  throw new Error(`Unable to fetch Spotify data from ${url}`, { cause: lastError });
}

function readEmbedEntity(html: string): EmbedEntity {
  const json = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
  if (!json) throw new Error('Spotify embed did not contain playlist data');

  const data = JSON.parse(json);
  const entity = data?.props?.pageProps?.state?.data?.entity as EmbedEntity | undefined;
  if (!entity || entity.id !== playlistId || !Array.isArray(entity.trackList) || entity.trackList.length === 0) {
    throw new Error('Spotify embed playlist data had an unexpected shape');
  }
  return entity;
}

async function getTrackImage(trackId: string, fallback: string): Promise<string> {
  try {
    const url = `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${trackId}`)}`;
    const response = await fetchWithRetry(url, 2);
    const data = await response.json();
    return typeof data.thumbnail_url === 'string' ? data.thumbnail_url : fallback;
  } catch {
    return fallback;
  }
}

async function loadSpotifyPlaylist(): Promise<SpotifyPlaylist> {
  const response = await fetchWithRetry(embedHref);
  const entity = readEmbedEntity(await response.text());
  const coverSources = entity.coverArt?.sources ?? [];
  const fallbackImage = coverSources.find((source) => source.width === 300)?.url ?? coverSources[0]?.url ?? '';

  const tracks = await Promise.all(entity.trackList!.map(async (track) => {
    const id = track.uri?.match(/^spotify:track:(.+)$/)?.[1];
    if (!id || !track.title || !track.subtitle) throw new Error('Spotify returned an incomplete track');

    return {
      id,
      title: track.title,
      artist: track.subtitle,
      image: await getTrackImage(id, fallbackImage),
      preview: track.audioPreview?.url ?? '',
    };
  }));

  return {
    id: playlistId,
    name: entity.title ?? 'Listening Lately',
    href: playlistHref,
    tracks,
  };
}

export function getSpotifyPlaylist(): Promise<SpotifyPlaylist> {
  playlistPromise ??= loadSpotifyPlaylist();
  return playlistPromise;
}
