import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Index7 = () => {
  const navigate = useNavigate();
  return (
    
    <div>
      {/* Navbar */}
      <header>
        <h1>
          <span style={{fontFamily: "'Brush Script MT",fontSize:"2rem"}}>Tour Ally- </span><span style={{fontFamily: "'Brush Script MT",fontSize:"2rem" ,color:"black", WebkitTextFillColor: "black"}}>Safe Travel, Happy Memories</span>
        </h1>
        
        
        <nav>
          <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => {
              const section = document.getElementById("home");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Home
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => {
              const section = document.getElementById("about");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            About
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => {
              const section = document.getElementById("features");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Features
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => {
              const section = document.getElementById("dashboard");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Dashboard
          </div>
          <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact
          </div>
         <div
            style={{
              display: "inline-block",
              marginLeft: "20px",
              cursor: "pointer",
              padding: "8px 16px",
              backgroundColor: "#ff9800",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onClick={() => navigate("/signin")} // SPA navigation using React Router
          >
            Login
          </div> 
        </nav>
      </header>

{/* Hero Section */}
<section
  id="home"
  className="hero"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1611773951057-ccca6a247f4b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",          
  }}
>
  {/* Dark overlay for readability */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", // transparent black overlay
      zIndex: 1,
    }}
  ></div>

  <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
   <h2 style={{ fontSize: "3.5rem", marginBottom: "20px" }}>
  Smart Tourist Safety &{" "}
  <span style={{ color: "rgba(201, 182, 56, 1)" }}>Digital ID</span>

</h2>

   <p
  style={{
    fontSize: "1.2rem",
    marginBottom: "30px",
    textAlign: "left",   // 👈 makes lines align left
    maxWidth: "700px"    // 👈 optional: keeps text in a nice block
  }}
>
  Every tourist is equipped with a tamper-proof blockchain-based Digital ID, <br />
  ensuring seamless identity verification, uncompromised security, <br />
  and real-time protection powered by AI-driven monitoring and predictive alerts.
</p>

    <Link
      to="/id"
      style={{
        background: "#2563eb",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Generate Your Digital ID
    </Link>
  </div>
</section>


      {/* About Us */}
      <section id="about">
        <h2 style={{color:"black", fontWeight:"bold", fontSize:"2.8rem"}}>About Us</h2>
        <p style={{color:"black", fontSize:"1.2rem"}}>Revolutionizing travel safety through cutting-edge technology and innovative solutions</p>
        <div className="about">
          <div className="about-text">
            <h2 style={{color:"black", fontWeight:"bold", fontSize:"1.8rem"}}>Your Trusted Travel Safety Partner</h2>
            <p style={{color:"black"}}>
              We are dedicated to ensuring tourist safety through AI,
              blockchain, and geo-fencing. Our system provides real-time
              monitoring, emergency response, and tamper-proof digital
              identities for every tourist, especially in high-risk regions like
              the Northeast where traditional methods are insufficient.
            </p>
            <p style={{color:"black"}}>
              Our mission is simple: <b>Safe Travel, Happy Memories</b>. With
              technology-driven solutions, we aim to protect tourists while
              supporting local authorities in managing incidents effectively.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Tourism"
          />
        </div>
        <div className="stats">
          <div className="stat-box">
            <h3>50K+</h3>
            <p>Tourists Protected</p>
          </div>
          <div className="stat-box">
            <h3>24/7</h3>
            <p>Emergency Support</p>
          </div>
          <div className="stat-box">
            <h3>99.9%</h3>
            <p>System Reliability</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <h2 style={{color:"black",fontSize:"2.8rem"}}>Comprehensive Safety Features</h2>
        <p style={{color:"black"}}>Advanced technology solutions designed to keep you safe and secure throughout your travels</p>
        <div className="features">
          <Link to="/id" className="card-link">
            <div className="card">
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Blockchain ID</h3>
              <p style={{color:"black", fontWeight:"bold"}}>Unique, tamper-proof IDs issued at entry points.</p>
            </div>
          </Link>
          <Link to="/geofencing" className="card-link">
            <div className="card" >
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Geo-Fencing</h3>
              <p style={{color:"black", fontWeight:"bold"}}>Alerts when tourists enter restricted zones.</p>
            </div>
          </Link>
          <Link to="/panicbutton" className="card-link">
            <div className="card">
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Panic Button</h3>
              <p style={{color:"black",fontWeight:"bold"}}>Instant SOS with live location to police & contacts.</p>
            </div>
          </Link>
          <Link to="/aimonitoring" className="card-link">
            <div className="card">
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>AI Monitoring</h3>
              <p style={{color:"black",fontWeight:"bold"}}>Detects anomalies like inactivity or route deviation.</p>
            </div>
          </Link>
          <div
            className="card"
            onClick={() => {
              document
                .getElementById("dashboard")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Dashboard</h3>
            <p style={{color:"black",fontWeight:"bold"}}>Real-time visualizations for tourism authorities.</p>
          </div>

          <Link to="/dataprivacy" className="card-link">
            <div className="card">
              <h3 style={{ color: "#38bdf8", fontWeight:"bold"}}>Data Privacy</h3>
              <p style={{color:"black",fontWeight:"bold"}}>Your personal information is encrypted & secure.</p>
            </div>
          </Link>
          <Link to="/touristinsights" className="card-link">
            <div className="card">
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Tourist Insights</h3>
              <p style={{color:"black",fontWeight:"bold"}}>Smart analytics help improve tourism services.</p>
              
            </div>
          </Link>
          <Link to="/gpslogsviewer" className="card-link">
            <div className="card">
              <h3 style={{color:"#38bdf8", fontWeight:"bold"}}>Live Tracking</h3>
              <p style={{color:"black",fontWeight:"bold"}}>Smart analytics help improve tourism services.</p>
              
            </div>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <h2 style={{color:"black", fontWeight:"bold", fontSize:"2.8rem"}}>What Tourists Say</h2>
          <div className="testimonial-box">
            <p>
              "The digital ID gave me peace of mind while traveling in remote
              areas. I felt safe throughout my journey!"
            </p>
            <span>- Riya Sharma, Tourist from Delhi</span>
          </div>
          <div className="testimonial-box">
            <p>
              "Thanks to the panic button, local police arrived in minutes when
              we faced an emergency. Brilliant system!"
            </p>
            <span>- John Miller, Tourist from USA</span>
          </div>
        </div>
      </section>

      {/*Toursim Dashboard */}
      <section id="dashboard">
        <h2 style={{color:"black", fontWeight:"bold", fontSize:"2.8rem"}}>Tourism Dashboard</h2>
        <div className="dashboard-grid">
          <div className="stat">
            <h3>Active Tourists</h3>
            <div className="small">1,243 currently tracked</div>
            <div className="bar">
              <i style={{ width: "64%" }}></i>
            </div>
          </div>

          <div className="stat">
            <h3>Alerts Today</h3>
            <div className="small">High / Medium / Low</div>
            <div className="bar">
              <i style={{ width: "28%" }}></i>
            </div>
          </div>

          <div className="stat">
            <h3>Pending Incidents</h3>
            <div className="small">Awaiting response</div>
            <div className="bar">
              <i style={{ width: "16%" }}></i>
            </div>
          </div>

          <div className="stat">
            <h3>Resolved Incidents</h3>
            <div className="small">Handled by authorities</div>
            <div className="bar">
              <i style={{ width: "82%" }}></i>
            </div>
          </div>

          <div className="stat">
            <h3>Tourist Safety Score</h3>
            <div className="small">
              Auto-computed from travel patterns & risk
            </div>
            <div className="bar">
              <i style={{ width: "76%" }}></i>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <div className="small">
                Current: <strong>76</strong>
              </div>
              <div className="small">
                Avg: <strong>68</strong>
              </div>
            </div>
          </div>

          <div className="stat">
            <h3>Language Support</h3>
            <div className="small">Active translations</div>
            <div className="bar">
              <i style={{ width: "90%" }}></i>
            </div>
          </div>

          <div className="stat">
            <h3>Emergency Response Time</h3>
            <div className="small">Average in minutes</div>
            <div className="bar">
              <i style={{ width: "40%" }}></i>
            </div>
            <div className="small" style={{ marginTop: "8px" }}>
              <strong>12 min</strong> avg
            </div>
          </div>

          <div className="stat">
            <h3>Most Visited Region</h3>
            <div className="small">Top tourist destination</div>
            <div className="bar">
              <i style={{ width: "70%" }}></i>
            </div>
            <div className="small" style={{ marginTop: "8px" }}>
              <strong>Shillong, Meghalaya</strong>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2 style={{color:"black", fontSize:"2.32rem"}} >Frequently Asked Questions</h2>

        <div className="faq-item">
          <div className="faq-question">
            <h4>How secure is my data?</h4>
            <span>+</span>
          </div>
          <div className="faq-answer">
            <p>
              All data is encrypted using blockchain technology, making it
              tamper-proof and secure.
            </p>
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">
            <h4>Is this system free for tourists?</h4>
            <span>+</span>
          </div>
          <div className="faq-answer">
            <p>
              Yes, digital IDs are issued free of cost at airports, hotels, and
              entry points.
            </p>
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">
            <h4>Can I access the system offline?</h4>
            <span>+</span>
          </div>
          <div className="faq-answer">
            <p>
              Yes, emergency alerts and panic button work even in
              low-connectivity zones.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
     <section id="contact" className="contact">
  <h2 style={{ color: "#111827", fontWeight: "bold", fontSize: "3rem", marginBottom: "40px",textAlign: "center"}}>Get in Touch</h2>
  
  <div className="contact-grid">
    {/* Left: Form */}
<form
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.2)", // semi-transparent white
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)", // nice frosted glass effect
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "0 auto", // center horizontally
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }}
>
  <label style={{ color: "black" }}>Full Name</label>
  <input type="text" placeholder="Enter your full name" required />

  <label style={{ color: "black" }}>Email Address</label>
  <input type="email" placeholder="Enter your email address" required />

  <label style={{ color: "black" }}>Message (Max 500 characters)</label>
  <textarea
    rows="5"
    placeholder="Tell us how we can help you..."
    maxLength="500"
  ></textarea>

  <button
    type="submit"
    style={{
      backgroundColor: "#f59e1cff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem"
    }}
  >
    Send Message
  </button>
</form>


    {/* Right: Info Boxes */}
    <div className="contact-info">
      <div className="info-box">
        <div className="icon emergency">📞</div>
        <h4>24/7 Emergency Support</h4>
        <p>For immediate assistance during emergencies:</p>
        <strong>+1-800-SAFE-TOUR</strong>
        <small>(+1-800-723-3868)</small>
      </div>

      <div className="info-box">
        <div className="icon email">✉️</div>
        <h4>Email Support</h4>
        <p>General inquiries and support:</p>
        <strong>support@smarttouristsafety.com</strong>
      </div>

      <div className="info-box">
        <div className="icon time">⏱️</div>
        <h4>Response Time</h4>
        <p>Emergency situations: &lt; 2 minutes</p>
        <p>General inquiries: &lt; 4 hours</p>
        <p>Technical support: &lt; 24 hours</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer>
        © 2025 Smart Tourist Safety — All rights reserved.
        <div className="links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Index7;
