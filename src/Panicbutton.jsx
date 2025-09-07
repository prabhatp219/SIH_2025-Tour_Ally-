import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PanicButton() {
  const [sosNumber, setSosNumber] = useState(localStorage.getItem("sosNumber") || "");
  const [sosLog, setSosLog] = useState("No SOS sent yet.");
  const [policeInfo, setPoliceInfo] = useState("Fetching nearest police station...");
  const [hospitalInfo, setHospitalInfo] = useState("Fetching nearest hospital...");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sosNumber")) {
      setSosNumber(localStorage.getItem("sosNumber"));
    }
  }, []);

  const saveNumber = () => {
    if (sosNumber.trim()) {
      localStorage.setItem("sosNumber", sosNumber);
      alert("SOS number saved!");
    } else {
      alert("Please enter a valid number.");
    }
  };

  const sendSOS = (lat, lng) => {
    if (!sosNumber) {
      alert("Please save your SOS number first!");
      return;
    }

    if (!sosNumber.startsWith("+") || sosNumber.length < 10) {
      alert("Please enter a valid number in +countrycode format, e.g., +919876543210");
      return;
    }

    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
    const time = new Date().toLocaleTimeString();

    setSosLog(
      <>
        🚨 SOS Alert Sent! <br />
        <strong>Time:</strong> {time} <br />
        <strong>Latitude:</strong> {lat} <br />
        <strong>Longitude:</strong> {lng} <br />
        <strong>SOS Number:</strong> {sosNumber} <br />
        <strong>Google Maps:</strong>{" "}
        <a href={mapLink} target="_blank" rel="noopener noreferrer">{mapLink}</a>
      </>
    );

    setAnimating(true);

    // Send SMS via backend
    axios.post("http://localhost:5000/send-sms", {
      to: sosNumber,
      message: `🚨Emergency SOS! I need help, Please help I am in danger🚨! My location: ${mapLink}`,
    })
    .then(res => {
      console.log("SMS sent:", res.data);
      alert("SOS sent successfully!");
    })
    .catch(err => {
      console.error("Error sending SOS:", err);
      alert("Failed to send SOS. See console for details.");
    })
    .finally(() => {
      setTimeout(() => setAnimating(false), 500);
    });
  };

  const fetchNearby = (lat, lng) => {
    const query = `
      [out:json];
      (
        node(around:3000,${lat},${lng})[amenity=police];
        node(around:3000,${lat},${lng})[amenity=hospital];
      );
      out body;
      >;
      out skel qt;
    `;
    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    })
    .then(res => res.json())
    .then(data => {
      let police = data.elements.find(e => e.tags && e.tags.amenity === "police");
      let hospital = data.elements.find(e => e.tags && e.tags.amenity === "hospital");

      setPoliceInfo(
        police
          ? <div className="contact-item">
              <strong>🚔 Police:</strong> {police.tags.name || "Nearest Police Station"} <br />
              📍 <a href={`https://www.google.com/maps?q=${police.lat},${police.lon}`} target="_blank" rel="noopener noreferrer">View on Map</a>
            </div>
          : <div className="contact-item">🚔 No police station found nearby.</div>
      );

      setHospitalInfo(
        hospital
          ? <div className="contact-item">
              <strong>🏥 Hospital:</strong> {hospital.tags.name || "Nearest Hospital"} <br />
              📍 <a href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`} target="_blank" rel="noopener noreferrer">View on Map</a>
            </div>
          : <div className="contact-item">🏥 No hospital found nearby.</div>
      );
    })
    .catch(err => {
      console.error(err);
      setPoliceInfo("🚔 Could not fetch police station.");
      setHospitalInfo("🏥 Could not fetch hospital.");
    });
  };

  const handlePanic = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          sendSOS(lat, lng);
          fetchNearby(lat, lng);
        },
        err => alert("Error getting location: " + err.message)
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  return (
    <div style={{ margin: 0, fontFamily: "Outfit, sans-serif", background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "#f1f5f9", display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px", background: "linear-gradient(90deg, #ef4444, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>🚨 Panic Button</h1>
      <p style={{ fontSize: "1rem", color: "#cbd5e1", marginBottom: "20px" }}>
        Press the button to send SOS with your live location automatically to your SOS number and emergency contacts.
      </p>

      <input
        type="tel"
        value={sosNumber}
        onChange={(e) => setSosNumber(e.target.value)}
        placeholder="Enter SOS Number (+countrycode)"
        style={{ padding: "12px", borderRadius: "10px", border: "none", width: "200px", marginBottom: "15px", fontSize: "1rem", background: "rgba(255,255,255,0.08)", color: "#f1f5f9", textAlign: "center" }}
      />
      <button onClick={saveNumber} style={{ padding: "10px 20px", border: "none", borderRadius: "25px", background: "linear-gradient(90deg,#06b6d4,#7c3aed)", color: "#fff", fontWeight: "bold", cursor: "pointer", marginBottom: "20px", transition: "0.3s" }}>
        Save Number
      </button>

      <button
        onClick={handlePanic}
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle at top left, #ef4444, #dc2626)",
          border: "none",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.8)",
          transform: animating ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          animation: "pulse 1.5s infinite"
        }}
      >
        SOS
      </button>

      <div style={{ marginTop: "25px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", maxWidth: "600px", width: "90%", fontSize: "0.95rem", textAlign: "left", lineHeight: 1.5, boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}>
        {sosLog}
      </div>

      <div style={{ marginTop: "25px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", maxWidth: "600px", width: "90%", fontSize: "0.95rem", textAlign: "left", lineHeight: 1.5, boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}>
        <h3>📞 Nearest Emergency Contacts</h3>
        <div>{policeInfo}</div>
        <div>{hospitalInfo}</div>
      </div>

      <footer style={{ marginTop: "30px", fontSize: "0.8rem", color: "#94a3b8" }}>
        © 2025 Smart Tourist Safety System
      </footer>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// just checking its working or not