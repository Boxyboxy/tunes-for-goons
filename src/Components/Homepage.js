import { Image, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export function Homepage() {
  const [user, setUser] = useOutletContext();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    console.log(user);
    console.log(window.localStorage.getItem("spotify-token"));
  }, []);

  const navigate = useNavigate();

  return <></>;
}
