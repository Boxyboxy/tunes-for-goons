import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";

import { QueryTrackList } from "./QueryTrackList";

export function QueryTrackForm({ user }) {
  const [query, setQuery] = useState({
    track: "",
    artist: "",
  });
  const [queryResult, setQueryResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [renderResult, setRenderResults] = useState(true);

  const handleFormChange = (e) =>
    setQuery((query) => ({ ...query, [e.target.name]: e.target.value }));

  const queryTrack = (e) => {
    e.preventDefault();
    setError("");
    const accessToken = window.localStorage.getItem("spotify-token");
    axios
      .get(
        `https://api.spotify.com/v1/search?query=${
          query.track + " " + query.artist
        }&type=track&include_external=audio&offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data: result }) => {
        console.log(result.tracks.items);
        setQueryResult(result.tracks.items);
      })

      .then(setIsLoading(false), setRenderResults(true))
      .catch((err) => setError(err.message));
  };

  return (
    <Col
      className="d-flex align-items-center flex-column m-auto"
      style={{ maxWidth: "80%", color: "#1DB954" }}
    >
      <h3>Query Inputs</h3>
      <Form
        onSubmit={(e) => {
          setIsLoading(true);
          queryTrack(e);
        }}
        className="mb-4"
      >
        {error && (
          <Form.Group>
            <Alert variant="danger">{error}</Alert>
          </Form.Group>
        )}

        <Form.Group className="mb-3 mt-3">
          <FloatingLabel
            controlId="floatingTrack"
            label="Track"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="track"
              placeholder="Track"
              value={query.track}
              onChange={(e) => handleFormChange(e)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingArtist"
            label="Artist"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="artist"
              placeholder="Artist"
              value={query.artist}
              onChange={(e) => handleFormChange(e)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="d-flex justify-content-center">
          <Button
            variant="success"
            type="submit"
            className="w-100"
            disabled={!query.track || !query.artist || isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Form.Group>
      </Form>
      {renderResult && queryResult.length > 1 && (
        <QueryTrackList tracks={queryResult} />
      )}
    </Col>
  );
}
