import React from "react";

// import logo from "./logo.svg";
import "./App.css";
import Map from "./containers/Map";

export default function App() {
  return (
    <div className="App" style={{ height: "80%" }}>
      <div className="App-header">
        <h2>Disaster-Water-Stations-Map</h2>
      </div>
      <Map id="map" />
    </div>
  );
}
