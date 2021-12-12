import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Running from "./pages/Running";
import initialize from "./local/initilization";
import Trekking from "./pages/Trekking";
import Climbing from "./pages/Climbing";
import Fitness from "./pages/Fitness";
import Settings from "./pages/Settings";

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

initialize();

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/goals-web-ui">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/running" element={<Running />} />
        <Route path="/trekking" element={<Trekking />} />
        <Route path="/climbing" element={<Climbing />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
