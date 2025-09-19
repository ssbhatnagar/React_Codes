import React from "react";
import Globe from "react-globe.gl";
import { useNavigate } from "react-router-dom";

const projects = [
  { name: "Todo App", lat: 28.6, lng: 77.2, route: "/todo" }, // Delhi
  { name: "Calculator", lat: 19.0, lng: 72.8, route: "/calculator" }, // Mumbai
  { name: "Advanced Todo App", lat: 12.9, lng: 77.6, route: "/todofinal" }, // Bangalore
];

const GlobeView = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={projects}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.name}
        labelSize={1.5}
        onLabelClick={(d) => navigate(d.route)}
      />
    </div>
  );
};

export default GlobeView;
