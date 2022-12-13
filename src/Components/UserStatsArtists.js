import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { UserStatsArtistList } from "./UserStatsArtistList";

export function UserStatsArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("");
  useEffect(() => {
    if (range !== "") {
      axios
        .get(`https://api.spotify.com/v1/me/top/artists?time_range=${range}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "spotify-token"
            )}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data: topArtistsResult }) => {
          console.log(topArtistsResult.items);
          setTopArtists(topArtistsResult.items);
        })
        .catch((err) => setError(err.message));
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
      {topArtists && <UserStatsArtistList artists={topArtists} />}
    </>
  );
}
