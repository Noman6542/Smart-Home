import React, { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";

const Coverage = () => {
  const mapRef = useRef(null);
  const serviceCenters = useLoaderData();

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  const centerBD = [23.8103, 90.4125];

  // 🔎 Debounced Search
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value) {
      setFiltered([]);
      return;
    }

    const matched = serviceCenters.filter((item) =>
      item.district.toLowerCase().includes(value)
    );

    setFiltered(matched);
  };

  // 📌 Move map
  const handleSelectDistrict = (district) => {
    const coord = [district.latitude, district.longitude];
    mapRef.current.flyTo(coord, 12, { duration: 1 });
    setQuery(district.district);
    setFiltered([]);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const findDistrict = serviceCenters.find((d) =>
      d.district.toLowerCase().includes(query.toLowerCase())
    );

    if (!findDistrict) {
      setError("No district found!");
      return;
    }

    handleSelectDistrict(findDistrict);
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl mt-10 font-extrabold text-center"
      >
        We are available in
        <span className="text-primary block mt-2">64 Districts</span>
      </motion.h2>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-lg mx-auto mt-6"
      >
        <form onSubmit={handleSubmit}>
          <label className="input bg-white/40 backdrop-blur-md border shadow-md rounded-xl flex items-center gap-3 px-4">
            <svg
              className="h-[1.2em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              placeholder="Search district..."
              value={query}
              onChange={handleSearchChange}
              className="grow bg-transparent outline-none"
            />
          </label>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {/* Suggestions Dropdown */}
        {filtered.length > 0 && (
          <ul className="absolute mt-2 bg-white shadow-lg rounded-xl max-h-52 overflow-y-auto w-full z-50">
            {filtered.map((item, i) => (
              <li
                key={i}
                className="px-4 py-3 hover:bg-primary/10 cursor-pointer"
                onClick={() => handleSelectDistrict(item)}
              >
                {item.district}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-10"
      >
        <MapContainer
          center={centerBD}
          zoom={7}
          ref={mapRef}
          scrollWheelZoom={false}
          className="h-[750px] rounded-xl shadow-lg"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markers */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br />
                Areas: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default Coverage;
