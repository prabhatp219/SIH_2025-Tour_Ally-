import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Geofencing() {
  useEffect(() => {
    const alertBox = document.getElementById("alertBox");
    const mapContainer = document.getElementById("mapContainer");
    const mapPlaceholder = document.getElementById("mapPlaceholder");
    const mapDiv = document.getElementById("map");
    const logPanel = document.getElementById("logPanel");
    let map, touristMarker;

    const zones = [
      { lat: 28.6139, lng: 77.2090, radius: 500, name: "Restricted Zone A", type: "restricted" },
      { lat: 28.6129, lng: 77.2295, radius: 400, name: "Restricted Zone B", type: "restricted" },
      { lat: 28.61, lng: 77.23, radius: 600, name: "Flood-Prone Area", type: "danger" },
      { lat: 28.62, lng: 77.22, radius: 700, name: "Landslide Risk Zone", type: "danger" }
    ];

    function showAlert(message) {
      alertBox.textContent = message;
      alertBox.style.display = "block";
      setTimeout(() => (alertBox.style.display = "none"), 5000);

      const time = new Date().toLocaleTimeString();
      if (logPanel.textContent === "No alerts yet.") logPanel.textContent = "";
      logPanel.innerHTML += `<div>🕒 ${time} - ${message}</div>`;

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Geo-Fencing Alert", {
          body: message,
          icon: "https://img.icons8.com/fluency/48/alarm.png",
        });
      }
    }

    function checkZones(lat, lng) {
      zones.forEach((zone) => {
        let distance = map.distance([lat, lng], [zone.lat, zone.lng]);
        if (distance < zone.radius) {
          let msg =
            zone.type === "danger"
              ? `⚠ High Risk! You entered a danger zone: ${zone.name}`
              : `⛔ You entered a restricted area: ${zone.name}`;
          showAlert(msg);
        }
      });
    }

    if (mapContainer) {
      mapContainer.addEventListener("click", () => {
        mapPlaceholder.style.display = "none";
        mapDiv.style.display = "block";

        map = L.map("map").setView([28.6139, 77.2090], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        zones.forEach((zone) => {
          let color = zone.type === "danger" ? "orange" : "red";
          let fill = zone.type === "danger" ? "#f97316" : "#f03";
          L.circle([zone.lat, zone.lng], {
            color: color,
            fillColor: fill,
            fillOpacity: 0.3,
            radius: zone.radius,
          })
            .addTo(map)
            .bindPopup(
              (zone.type === "danger" ? "⚠ Danger Area: " : "⛔ Restricted: ") + zone.name
            );
        });

        touristMarker = L.marker([28.61, 77.21]).addTo(map).bindPopup("Locating you...");

        if ("Notification" in window && Notification.permission !== "granted") {
          Notification.requestPermission();
        }

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              touristMarker
                .setLatLng([lat, lng])
                .bindPopup("Your Location")
                .openPopup();
              map.setView([lat, lng], 15);
              checkZones(lat, lng);
            },
            (err) => {
              console.warn("Geolocation error: " + err.message);
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
          );
        } else {
          alert("Geolocation not supported in this browser.");
        }
      });
    }
  }, []);

  return (
    <div>
      {/* Alert */}
      <div className="alert-box" id="alertBox">
        ⚠ You entered a restricted/danger zone!
      </div>

      {/* Main Content */}
      <main>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="card">
            <h3 style={{color:"#38bdf8"}}>Geo-Fencing</h3>
            <p style={{color:"black",fontWeight:"bold"}}>Alerts when tourists enter restricted or danger-prone areas.</p>
          </div>
          <div className="card">
            <h3 style={{color:"#38bdf8"}}>Safety Tips</h3>
            <p style={{color:"black",fontWeight:"bold"}}>
              Follow local guidelines. Avoid high-risk regions during heavy rains or earthquakes.
            </p>
          </div>
          <div className="card">
            <h3 style={{color:"#38bdf8",fontWeight:"bold"}}>Live Weather</h3>
            <p style={{color:"black",fontWeight:"bold"}}>⛅ Currently: 32°C, Clear Skies (demo data)</p>
          </div>
          <div className="card">
            <h3 style={{color:"#38bdf8",fontWeight:"bold"}}>Alert Log</h3>
            <div className="log-panel" id="logPanel">
              No alerts yet.
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-container" id="mapContainer">
          <div className="map-placeholder" id="mapPlaceholder">
            📍 Click here to load live map & location tracking
          </div>
          <div id="map" style={{ height: "100%", width: "100%", borderRadius: "16px", display: "none" }}></div>
        </div>
      </main>

      {/* Footer */}
      <footer>© 2025 Smart Tourist Safety System</footer>
    </div>
  );
}
