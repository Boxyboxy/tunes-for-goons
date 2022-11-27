import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

import { TrackCard } from "./TrackCard";

export function TrackList({ tracks }) {
  tracks.forEach((track, index) => console.log(track));
  return (
    <Col className="p-4">
      <h3>Query Result</h3>

      <Row>
        {tracks.length ? (
          tracks.map((element, index) => (
            <TrackCard key={index} track={element} />
          ))
        ) : (
          <Col>No track to display</Col>
        )}
      </Row>
    </Col>
  );
}
