import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

import { Button, Col } from "react-bootstrap";

export function UserStatsTrackCard({ track, setTrack }) {
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const convertMsToMinutesSeconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${padTo2Digits(seconds)}`;
  };

  useEffect(() => {
    console.log(track);
  });

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="g-3">
      {track && (
        <Card
          style={{ height: "450px", width: "250px", color: "#1db954" }}
          bg="dark"
          border="success"
        >
          <Card.Title>{track.name}</Card.Title>
          <Card.Img variant="top" src={track.album.images[1].url} />
          <Card.Body style={{ height: "50%" }}>
            <Card.Text>Artist: {track.artists[0].name}</Card.Text>
            <Card.Text>
              Length: {convertMsToMinutesSeconds(track.duration_ms)}
            </Card.Text>
            <Button variant="success" onClick={() => setTrack(track)}>
              Listen
            </Button>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}

// unable to pass track to parent
