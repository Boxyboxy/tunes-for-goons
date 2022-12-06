import React from "react";
import Card from "react-bootstrap/Card";
import { JournalEntryModal } from "./JournalEntryModal";
import { Col } from "react-bootstrap";

export function JournalEntryCard({ entry, user }) {
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

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="g-3">
      <Card style={{ height: "450px", width: "250px" }}>
        <Card.Title>{entry.name}</Card.Title>
        <Card.Img variant="top" src={entry.album.images[1].url} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Text>Artist: {entry.artists[0].name}</Card.Text>
          <Card.Text>
            Length: {convertMsToMinutesSeconds(entry.duration_ms)}
          </Card.Text>
          <JournalEntryModal entry={entry} user={user} />
        </Card.Body>
      </Card>
    </Col>
  );
}
