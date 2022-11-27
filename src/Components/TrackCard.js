import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export function TrackCard({ track }) {
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
  const navigate = useNavigate();
  const createTrack = () => {
    navigate("/create", { state: { track: track } });
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="g-3">
      <Card style={{ height: "450px", width: "250px" }}>
        <Card.Title>{track.name}</Card.Title>
        <Card.Img variant="top" src={track.album.images[1].url} />
        <Card.Body style={{ height: "50%" }}>
          <Card.Text>Artist: {track.artists[0].name}</Card.Text>
          <Card.Text>
            Length: {convertMsToMinutesSeconds(track.duration_ms)}
          </Card.Text>
          <Button variant="success" onClick={createTrack}>
            Select
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
