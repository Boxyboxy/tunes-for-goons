import React from "react";
import { Col, Row } from "react-bootstrap";
import { JournalEntryCard } from "./JournalEntryCard";

export function JournalEntryList({ entries, user }) {
  return (
    <Col className="p-4">
      <h3>Your Journal Entries</h3>

      <Row>
        {entries.length ? (
          entries.map((element, index) => (
            <JournalEntryCard key={index} entry={element} user={user} />
          ))
        ) : (
          <Col>No entries to display</Col>
        )}
      </Row>
    </Col>
  );
}
