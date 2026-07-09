"use client";

import { media } from "@/lib/content";

export default function SpotifyApp() {
  return (
    <div className="h-full bg-[#121212] p-2">
      <iframe
        src={`https://open.spotify.com/embed/playlist/${media.spotifyPlaylist}?theme=0`}
        title="Spotify player"
        className="h-full w-full rounded-lg"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
