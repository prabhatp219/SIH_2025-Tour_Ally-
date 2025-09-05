import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Aimonitoring() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const logPanelRef = useRef(null);
  const alertBoxRef = useRef(null);

  useEffect(() => {
    // Hero Slider
    let slideIndex = 0;
    const slides = document.querySelectorAll(".hero-slider img");

    const showSlides = () => {
      slides.forEach((img) => img.classList.remove("active"));
      slides[slideIndex].classList.add("active");
      slideIndex = (slideIndex + 1) % slides.length;
    };
    const sliderInterval = setInterval(showSlides, 3000);

    // Planned route coordinates
    const plannedRoute = [
      [28.6139, 77.209],
      [28.6145, 77.215],
      [28.6155, 77.22],
    ];

    let lastLat = null,
      lastLng = null,
      lastMoveTime = Date.now();

    // Show alert function
    const showAlert = (msg) => {
      const alertBox = alertBoxRef.current;
      const logPanel = logPanelRef.current;
      alertBox.textContent = msg;
      alertBox.style.display = "block";
      setTimeout(() => (alertBox.style.display = "none"), 5000);
      const time = new Date().toLocaleTimeString();
      if (logPanel.textContent === "No alerts yet.") logPanel.textContent = "";
      logPanel.innerHTML += `<div>🕒 ${time} - ${msg}</div>`;
    };

    // Initialize map
    
    const initMap = (lat, lng) => {
      mapRef.current = L.map("map").setView([lat, lng], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
      markerRef.current = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup("Tourist Location")
        .openPopup();
      L.polyline(plannedRoute, { color: "#06b6d4", weight: 4 })
        .addTo(mapRef.current)
        .bindPopup("Planned Route");
    };

    // Monitor function
    const monitor = (lat, lng) => {
      const map = mapRef.current;
      if (lastLat !== null && lastLng !== null) {
        const distanceMoved = map.distance([lat, lng], [lastLat, lastLng]);
        if (distanceMoved < 5 && Date.now() - lastMoveTime > 60000)
          showAlert("⚠ Tourist inactive for 1+ minute!");
        else if (distanceMoved >= 5) lastMoveTime = Date.now();
      }
      lastLat = lat;
      lastLng = lng;

      let nearRoute = false;
      plannedRoute.forEach((p) => {
        if (map.distance([lat, lng], p) < 50) nearRoute = true;
      });
      if (!nearRoute) showAlert("⚠ Tourist deviated from planned route!");
    };

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          if (!mapRef.current) initMap(lat, lng);
          markerRef.current
            .setLatLng([lat, lng])
            .bindPopup("Tourist Location")
            .openPopup();
          mapRef.current.setView([lat, lng], 14);
          monitor(lat, lng);
        },
        (err) => {
          console.warn(err);
        },
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    } else {
      alert("Geolocation not supported.");
    }

    // Cleanup
    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <div className="hero-slider">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
          className="active"
          alt="Tourist view 1"
        />
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
          alt="Tourist view 3"
        />
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Tourist view 5"
        />
      </div>

      {/* Alert Box */}
      <div className="alert-box" ref={alertBoxRef}>
        ⚠ Alert!
      </div>

      {/* Main Content */}
      <main>
        <div className="card">
          <h3>Tourist Info</h3>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="ID" />
          <p>Enter details for monitoring and alerts.</p>
        </div>

        <div className="card">
          <h3>Monitoring Status</h3>
          <p>Detecting inactivity and route deviations in real-time.</p>
          <div className="log-panel" ref={logPanelRef}>
            No alerts yet.
          </div>
        </div>

        <div className="card">
          <h3>Live Location</h3>
          <div id="map" style={{ height: "250px", borderRadius: "12px" }}></div>
        </div>

        <div className="card">
          <h3>Safety Tips</h3>
          <p>
            Stay hydrated, follow local guidelines, and avoid restricted or
            danger-prone areas. Alerts will show automatically if deviation
            occurs.
          </p>
        </div>
      </main>
    </div>
  );
}
