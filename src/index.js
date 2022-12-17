import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Homepage } from "./Components/Homepage";
import { SpotifyOAuth } from "./Components/SpotifyOAuth";
import { QueryTrackForm } from "./Components/QueryTrackForm";
import { JournalEntryForm } from "./Components/JournalEntryForm";
import { UserStats } from "./Components/UserStats";
import { AccountPage } from "./Components/AccountPage";
import { Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* nested routes of homepage and login page*/}
        <Route path="login" element={<SpotifyOAuth />} />
        <Route path="home" element={<Homepage />} />

        <Route path="query" element={<QueryTrackForm />} />
        <Route path="statistics" element={<UserStats />} />
        <Route path="account" element={<AccountPage />} />

        <Route path="create" element={<JournalEntryForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
