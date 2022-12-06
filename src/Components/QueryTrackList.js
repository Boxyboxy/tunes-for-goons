import React from "react";
import { Col, Row } from "react-bootstrap";

import { QueryTrackCard } from "./QueryTrackCard";

export function QueryTrackList({ tracks }) {
  tracks.forEach((track, index) => console.log(track));
  return (
    <Col className="p-4">
      <h3>Query Result</h3>

      <Row>
        {tracks.length ? (
          tracks.map((element, index) => (
            <QueryTrackCard key={index} track={element} />
          ))
        ) : (
          <Col>No track to display</Col>
        )}
      </Row>
    </Col>
  );
}
