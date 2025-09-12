import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import "./GpsLogsViewer.css";

// Fix default icon (Leaflet in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function GpsLogsViewer() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  // Fetch GPS logs
  const fetchGPS = async () => {
    try {
      const res = await fetch("https://smarttouristsafety.onrender.com/data");
      const data = await res.json();
      setLogs(data);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Error fetching GPS logs");
    }
  };

  // Initial + interval fetch
  useEffect(() => {
    fetchGPS();
    const interval = setInterval(fetchGPS, 5000);
    return () => clearInterval(interval);
  }, []);

  const latest = logs.length > 0 ? logs[logs.length - 1] : null;

  return (
    <div className="page">
      <h1>📍 Live Tourist Location Tracker</h1>
      <button className="refresh-btn" onClick={fetchGPS}>
        Refresh Logs
      </button>

      <div className="container">
        {/* Left panel: Table */}
        <div className="left-panel">
          <table id="gpsTable">
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Tag</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan="4">{error}</td>
                </tr>
              )}
              {!error && logs.length === 0 && (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              )}
              {!error &&
                logs.map((log, idx) => (
                  <tr key={idx}>
                    <td>{log.lat}</td>
                    <td>{log.lon}</td>
                    <td>{log.tag}</td>
                    <td>
                      {(() => {
                        try {
                          return new Date(log.timestamp).toLocaleString();
                        } catch {
                          return log.timestamp;
                        }
                      })()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Right panel: Map */}
        <div className="right-panel">
          <MapContainer
            center={latest ? [latest.lat, latest.lon] : [20, 78]}
            zoom={latest ? 15 : 5}
            style={{ height: "500px", width: "100%", borderRadius: "10px" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {latest && (
              <Marker position={[latest.lat, latest.lon]}>
                <Popup>
                  <b>Latest Location</b>
                  <br />
                  Lat: {latest.lat}, Lon: {latest.lon}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
