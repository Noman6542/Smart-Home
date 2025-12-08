import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const serviceCenters = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl mt-5 font-extrabold text-gray-800 text-center">
        We are available in
        <span className="text-primary block mt-2">64 Districts</span>
      </h2>

      {/* something will be happen */}
      <div></div>

      {/* main thing of map */}

      <div className="py-10">
        <MapContainer
          className="h-[800px]"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
