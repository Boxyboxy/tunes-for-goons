import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

export function UserStatsArtistCard({ artist }) {
  useEffect(() => {
    console.log(artist);
  });

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="g-3">
      {artist && (
        <Card
          style={{ height: "500px", width: "250px", color: "#1db954" }}
          bg="dark"
          border="success"
        >
          <Card.Title>{artist.name}</Card.Title>
          <Card.Img variant="top" src={artist.images[2].url} />
          <Card.Body style={{ height: "50%" }}>
            <Card.Text>Genres: {artist.genres.join("/")}</Card.Text>
            <Card.Text>Followers: {artist.followers.total}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}
