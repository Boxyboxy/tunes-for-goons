import logo from './logo.svg';
import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string';

function App() {
  const { 
    REACT_APP_SPOTIFY_SCOPES: scope,
    REACT_APP_SPOTIFY_CLIENT_ID: clientId,
    REACT_APP_SPOTIFY_REDIRECT_URI: redirectUri,
  } = process.env;

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const query = qs.parse(location.hash.replace('#', ''));
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${query.access_token}`,
          'Content-Type': 'application/json',
        }
      })
        .then(({ data }) => {
          // this data is your user token object from spotify
          console.log(data);
        })
    }
  }, [location.hash])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a 
          href={`https://accounts.spotify.com/authorize?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`}
          target="_blank" 
          rel="noreferrer"
        >
            Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
