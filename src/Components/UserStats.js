import axios from "axios";
import { useEffect, useState } from "react";

export function UserStats() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [error, setError] = useState(null);
  // useEffect enters a loop now, i need to check out how to stop the loop
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "spotify-token"
          )}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data: topTracksResult }) => {
        console.log(topTracksResult);
        setTopTracks(topTracksResult);
      })
      .catch((err) => setError(err.message));

    axios
      .get("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "spotify-token"
          )}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data: topArtistsResults }) => {
        console.log(topArtistsResults);
        setTopTracks(topArtistsResults);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  });

  return <>{error && <p>Error:{error}</p>}</>;
}
