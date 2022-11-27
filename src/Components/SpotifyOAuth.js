import logo from "../spotify-icons-logos/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import "./SpotifyOAuth.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { Image, Button } from "react-bootstrap";
import { writeUserData } from "../firebase/database";
export function SpotifyOAuth() {
  const {
    REACT_APP_SPOTIFY_SCOPES: scope,
    REACT_APP_SPOTIFY_CLIENT_ID: clientId,
    REACT_APP_SPOTIFY_REDIRECT_URI: redirectUri,
  } = process.env;
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const query = qs.parse(location.hash.replace("#", ""));

      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${query.access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data: user }) => {
          // this data is your user token object from spotify
          setUser(user); // once i refresh the page, the user is logged out
          setAccessToken(query.access_token);
          console.log(query.access_token);
          window.localStorage.setItem("spotify-token", query.access_token);
          // cannot retrieve accessToken from state????
          writeUserData(
            user.id,
            user.display_name,
            user.email,
            user.images[0].url,
            query.access_token
          );
        });
    }
  }, [location.hash]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!user && (
          <a
            href={`https://accounts.spotify.com/authorize?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`}
            target="_blank"
            rel="noreferrer"
          >
            Login to Spotify
          </a>
        )}
      </header>
    </div>
  );
}

/* https://accounts.spotify.com/authorize?scope=user-read-private%20user-read-email%20user-top-read&client_id=d6ed66348c6844569dbbd54e1a65a0c8&redirect_uri=http://localhost:3000/login&response_type=token */
