import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { UserStatsTrackList } from "./UserStatsTrackList";

export function UserStatsTracks() {
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("");
  const [track, setTrack] = useState(null);
  const [embedSourceUrl, setEmbedSourceUrl] = useState("");

  useEffect(() => {
    console.log(track);
    console.log(embedSourceUrl);
    if (track != null) {
      setEmbedSourceUrl(
        `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`
      );
    }
  }, [track]);

  useEffect(() => {
    if (range !== "") {
      axios
        .get(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "spotify-token"
            )}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data: topTracksResult }) => {
          console.log(topTracksResult.items);
          setTopTracks(topTracksResult.items);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [range]);

  return (
    <>
      {error && (
        <Form.Group>
          <Alert variant="danger">{error}</Alert>
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#1db954" }}>Time range</Form.Label>
        <Form.Select
          onChange={(e) => {
            setRange(e.target.value);
            console.log(range);
          }}
          style={{ color: "#1db954" }}
        >
          <option>Set Duration</option>
          <option value="short_term">Short</option>
          <option value="medium_term">Medium</option>
          <option value="long_term">Long</option>
        </Form.Select>
      </Form.Group>

      {embedSourceUrl !== "" && (
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
      )}
      {topTracks && (
        <UserStatsTrackList tracks={topTracks} setTrack={setTrack} />
      )}
    </>
  );
}
