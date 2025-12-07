import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Decorator = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl">We are available in 64 district</h2>
      {/* something will be happen */}
      <div></div>

      {/* main thing of map */}

      <div>
        <MapContainer>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Decorator;
