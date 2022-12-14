import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { Container } from "react-bootstrap";
import { TunesForGoonsNav } from "./Components/TunesForGoonsNav";
import { writeUserData } from "./firebase/database";
function App() {
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
    const token = window.localStorage.getItem("spotify-token");
    // navigate to login page if token does not exist
    if (token == null) {
      console.log("token null");
      navigate("/login");
    }

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data: user }) => {
        // this data is your user token object from spotify
        setUser(user);
        navigate(`/home`);
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        if (error.response.data.error.message == "The access token expired") {
          navigate("/login");
        }
      });

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

          console.log(query.access_token);
          window.localStorage.setItem("spotify-token", query.access_token);
          navigate(`/home`);

          writeUserData(
            user.id,
            user.display_name,
            user.email,
            user.images[0].url
          );
        });
    }
  }, []);

  const signOut = () => {
    setUser(null);
    window.localStorage.removeItem("spotify-token");
    navigate("/");
  };

  return (
    <>
      {user && <TunesForGoonsNav user={user} signOut={signOut} />}
      <Container
        fluid={true}
        className="App"
        style={{ backgroundColor: "#191414" }}
      >
        <Outlet context={[user, setUser]} />
      </Container>
    </>
  );
}

export default App;

// save token into local storage or cookies
// if its there, check if its still live.
// if not live, show them to user login page
// if live, pass user to context provider
// Done basic structure of Nav bar

// TODO
// think about how to structure data model
