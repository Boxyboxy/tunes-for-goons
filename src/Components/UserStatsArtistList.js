import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { UserStatsArtistCard } from "./UserStatsArtistCard";
export function UserStatsArtistList({ artists }) {
  useEffect(() => {
    console.log(artists);
  });
  return (
    <Col className="p-4">
      <h3 style={{ color: "#1db954" }}>Top Artists</h3>

      <Row>
        {artists.length ? (
          artists.map((element, index) => (
            <UserStatsArtistCard key={index} artist={element} />
          ))
        ) : (
          <Col style={{ color: "#1db954" }}>No artist to display</Col>
        )}
      </Row>
    </Col>
  );
}
