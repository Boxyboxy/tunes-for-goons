import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../spotify-icons-logos/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";

export function TunesForGoonsNav({ user, signOut }) {
  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/home" style={{ color: "#1DB954" }}>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Tunes for Goons
            </Nav.Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="collasible-nav-dropdown">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="statistics" style={{ color: "#1DB954" }}>
                User Stats
              </Nav.Link>
              <Nav.Link as={Link} to="/query" style={{ color: "#1DB954" }}>
                Query Track
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                menuVariant="dark"
                title={
                  <Image
                    src={user.images[0].url}
                    roundedCircle={true}
                    height="35"
                  ></Image>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/account"
                  style={{ color: "#1DB954" }}
                >
                  Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={signOut}
                  style={{ color: "#1DB954" }}
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
