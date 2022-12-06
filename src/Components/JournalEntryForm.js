import { useEffect, useState } from "react";

import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { createPost } from "../firebase/database";

export function JournalEntryForm() {
  const [thoughts, setThoughts] = useState("");
  const [user, setUser] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const track = location.state.track;
  useEffect(() => {
    console.log(track);
  });

  const handleFormChange = (e) => {
    setThoughts(e.target.value);
  };

  const handleSubmit = (e) => {
    // TODO: firebase save

    const payload = { ...track, thoughts: thoughts };

    createPost(user.id, payload);
    navigate("/home");
  };

  const embedSourceUrl = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`;

  return (
    <>
      <iframe
        title="Spotify"
        style={{ "border-radius": "12px" }}
        src={embedSourceUrl}
        width="50%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <Col
        className="d-flex align-items-center flex-column m-auto"
        style={{ maxWidth: "80%" }}
      >
        <Form style={{ width: "50%" }} onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="thoughtsAndFeelings">
            <Form.Label>Thoughts and Feelings</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={thoughts}
              onChange={(e) => handleFormChange(e)}
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-100">
              Post
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </>
  );
}
