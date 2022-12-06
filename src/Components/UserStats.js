import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { UserStatsTracks } from "./UserStatsTracks";
import { UserStatsArtists } from "./UserStatsArtists";

export function UserStats() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="short-term">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="tracks">Tracks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="artists">Artists</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="tracks">
              <UserStatsTracks />
            </Tab.Pane>
            <Tab.Pane eventKey="artists">
              <UserStatsArtists />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
