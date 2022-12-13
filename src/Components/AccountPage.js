import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
export function AccountPage() {
  const [user, setUser] = useOutletContext();

  useEffect(() => {
    console.log(user);
  });

  return (
    <Col
      className="d-flex align-items-center flex-column m-auto"
      style={{ maxWidth: "600px", color: "#1db954" }}
    >
      <Card
        style={{ width: "18rem" }}
        bg="dark"
        border="success"
        className="m-4"
      >
        <Card.Img
          as={Image}
          variant="top"
          src={user.images[0].url}
          roundedCircle={true}
        />
        <Card.Body>
          <Card.Title>{user.display_name}</Card.Title>
          <Card.Text>Followers: {user.followers.total}</Card.Text>
          <Card.Text>Country: {user.country}</Card.Text>
          <Card.Text>ID: {user.id}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
