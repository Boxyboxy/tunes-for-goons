import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { UserStatsTrackCard } from "./UserStatsTrackCard";
export function UserStatsTrackList({ tracks, setTrack }) {
  useEffect(() => {
    console.log(tracks);
  });
  return (
    <Col className="p-4">
      <h3 style={{ color: "#1db954" }}>Top Tracks</h3>

      <Row>
        {tracks.length ? (
          tracks.map((element, index) => (
            <UserStatsTrackCard
              key={index}
              track={element}
              setTrack={setTrack}
            />
          ))
        ) : (
          <Col style={{ color: "#1db954" }}>No track to display</Col>
        )}
      </Row>
    </Col>
  );
}
