import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-player";
import { useLocation } from "react-router-dom";

export function JournalEntryForm() {
  const location = useLocation();
  const track = location.state.track;
  useEffect(() => {
    console.log(track);
  });

  const embedSourceUrl = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`;

  return (
    <>
      <iframe
        title="Spotify"
        style={{ "border-radius": "12px" }}
        src={embedSourceUrl}
        width="50%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  );
}
