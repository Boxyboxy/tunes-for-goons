import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/esm/Image";
import { Container, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { editPost, deletePost } from "../firebase/database";
export function JournalEntryModal({ entry, user }) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newThoughts, setNewThoughts] = useState(entry.thoughts);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleFormChange = (e) => {
    setNewThoughts(e.target.value);
    console.log(newThoughts);
  };

  const deleteEntry = () => {
    deletePost(user.id, entry.db_id);
    setEdit(false);
    setShow(false);
  };

  const handleSave = () => {
    const { db_id, thoughts, ...data } = entry;
    const newEntry = { thoughts: newThoughts, ...data };
    editPost(user.id, db_id, newEntry).then(setEdit(false));
  };

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
    <>
      <Button variant="success" onClick={handleShow}>
        View
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{entry.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Image
                  style={{ width: "350px" }}
                  src={entry.album.images[1].url}
                />
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item>
                    Artist: {entry.artists[0].name}
                  </ListGroup.Item>
                  <ListGroup.Item>Album: {entry.album.name}</ListGroup.Item>
                  <ListGroup.Item>
                    Length: {convertMsToMinutesSeconds(entry.duration_ms)}
                  </ListGroup.Item>
                  {!edit && (
                    <ListGroup.Item>
                      Thoughts and feelings: {entry.thoughts}
                    </ListGroup.Item>
                  )}
                  {edit && (
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="thoughtsAndFeelings"
                      >
                        <FloatingLabel
                          controlId="floatingThoughtsAndFeelings"
                          label="Thoughts and feelings"
                          className="mb-3"
                        >
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={newThoughts}
                            onChange={(e) => handleFormChange(e)}
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Form>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteEntry}>
            Delete entry
          </Button>
          {!edit && (
            <Button variant="primary" onClick={handleEdit}>
              Edit changes
            </Button>
          )}
          {edit && (
            <Button variant="success" onClick={handleSave}>
              Save changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
