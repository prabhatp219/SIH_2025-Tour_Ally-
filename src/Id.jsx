import React, { useState, useEffect, useRef } from "react";
import QRious from "qrious";
import { QRCodeCanvas } from "qrcode.react";


//MARKER
export default function Idl() {
  const [formData, setFormData] = useState({
    name: "",
    passport: "",
    personal: "",
    emergency: "",
    from: "",
    to: "",
    place: "",
    arrival: "",
    exit: "",
  });

  const [displayData, setDisplayData] = useState({ ...formData });
  const [blockchainId, setBlockchainId] = useState("TRX-XXXXX");
  const qrRef = useRef(null);
  const qr = useRef(null);
  const [qrValue, setQrValue] = useState("Tourist Blockchain ID");

  // Initialize QRious for optional canvas preview
  useEffect(() => {
    qr.current = new QRious({
      element: qrRef.current,
      size: 95,
      value: qrValue,
    });
  }, []);

  // Update QR value dynamically whenever data changes
  const updateQR = (data, id) => {
    const qrData = `Blockchain ID: ${id || "Not Generated"}
Name: ${data.name}
Passport: ${data.passport}
Personal: ${data.personal}
Emergency: ${data.emergency}
From: ${data.from} → ${data.to}
Place: ${data.place}
Arrival: ${data.arrival}, Exit: ${data.exit}`;
    setQrValue(qrData);

    if (qr.current) {
      qr.current.value = qrData;
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedData = { ...formData, [id]: value };
    setFormData(updatedData);
    updateQR(updatedData, blockchainId);
  };

  // Generate random blockchain ID
  const generateBlockchainId = () =>
    "TRX-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Handle submit to generate new blockchain ID
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateBlockchainId();
    setBlockchainId(newId);
    setDisplayData({ ...formData });
    updateQR(formData, newId);
  };

  return (
    <div style={{ background: "#0f172a", color: "#f1f5f9", padding: "40px", fontFamily: "Roboto, sans-serif" }}>
      <div style={{  maxWidth: "900px",
    margin: "auto",
    display: "flex",
    flexDirection: "row", // side by side
    justifyContent: "space-between", // spacing between them
    gap: "30px"}}>
        {/* Form Card */}
        <div style={{
          background: "#1e293b", borderRadius: "15px", padding: "30px 25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
          <h3 style={{ marginBottom: "20px", fontSize: "1.6rem", color: "#38bdf8" }}>Generate Blockchain ID</h3>
          <form onSubmit={handleSubmit}>
            {["name", "passport", "personal", "emergency", "from", "to", "place"].map((field, idx) => (
              <div key={idx}>
                <label className="my-label" style={{ display: "block", margin: "10px 0 5px", fontSize: "0.9rem", fontWeight: "500", color: "#cbd5e1" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={field}
                  type="text"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155",
                    background: "#0f172a", color: "#f1f5f9", fontSize: "0.95rem", marginBottom: "12px"
                  }}
                />
              </div>
            ))}

            {/* Arrival and Exit */}
            {["arrival", "exit"].map((field, idx) => (
              <div key={idx}>
                <label style={{ display: "block", margin: "10px 0 5px", fontSize: "0.9rem", fontWeight: "500", color: "#cbd5e1" }}>
                  Date of {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  type="date"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #334155",
                    background: "#0f172a", color: "#f1f5f9", fontSize: "0.95rem", marginBottom: "12px"
                  }}
                />
              </div>
            ))}
            <button type="submit" style={{
              width: "100%", padding: "12px", marginTop: "10px",
              background: "linear-gradient(90deg,#38bdf8,#8b5cf6)",
              border: "none", borderRadius: "10px",
              fontSize: "1rem", fontWeight: "600", color: "#0f172a",
              cursor: "pointer"
            }}>Generate Blockchain ID</button>
          </form>
        </div>







        {/* Preview Card */}
        <div className="myCard"
        style={{
          background: "#1e293b", borderRadius: "18px", padding: "25px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
          <div>
        <span style={{
              padding: "5px 14px", borderRadius: "12px",
              background: "linear-gradient(90deg,#22d3ee,#0ea5e9)",
              color: "#0f172a", fontWeight: "600", fontSize: "0.75rem",
              textTransform: "uppercase"
        }}>✅ Verified</span>
        </div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "15px"
          }}>
            
         <span style={{
            display: "block", textAlign: "right", fontSize: "0.8rem", color: "#38bdf8",
            fontFamily: "Orbitron, sans-serif", textTransform: "uppercase", letterSpacing: "1px",
            marginTop: "5px"
          }}>🔒 Blockchain Secured</span>
           
            <span style={{
              fontFamily: "Orbitron, sans-serif", fontSize: "1rem", fontWeight: "700",
              color: "#38bdf8", textShadow: "0 0 10px rgba(56,221,248,0.7)", letterSpacing: "2px"
            }}>{blockchainId}</span>
          </div>




          

<div className="my-details-card idCard">
  {[
    { icon: "👤", value: displayData.name },
    { icon: "🛂", value: displayData.passport },
    { icon: "📱", value: displayData.personal },
    { icon: "📞", value: displayData.emergency },
    { icon: "🗺️", value: `${displayData.from || "---"} ➝ ${displayData.to || "---"}` },
    { icon: "🏨", value: displayData.place },
    { icon: "📅", value: `${displayData.arrival || "DD/MM/YYYY"} → ${displayData.exit || "DD/MM/YYYY"}` },
  ].map((item, idx) => (
    <p key={idx} className="my-details-item my-details">
      <strong className="my-details-icon">{item.icon}</strong> {item.value || "---"}
    </p>
  ))}

   <div style={{ textAlign: "center", marginTop: "12px" }}>
            <QRCodeCanvas
              value={qrValue}
              size={180}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
            <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "4px", textAlign: "center" }}>
              Scan to Verify
            </div>
          </div>
</div>










  
         

         
        </div>
      </div>
    </div>
  );
}
