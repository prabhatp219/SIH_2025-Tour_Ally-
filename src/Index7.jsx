import React from "react";
import { Link } from "react-router-dom";
const Index7 = () => {
  return (
    <div>
      {/* Navbar */}
      <header>
        <h1>Smart Tourist Safety</h1>
        <nav>
           <div
            style={{
              display: "inline-block",
              marginRight: "15px",
              cursor: "pointer",
              color: "white",
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
              color: "white",
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
              color: "white",
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
              color: "white",
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
              color: "white",
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
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h2>Smart Tourist Safety & Digital ID</h2>
          <p>
            Every tourist receives a unique blockchain-based ID ensuring
            security, trust, and real-time protection with AI-powered
            monitoring.
          </p>
          <Link to="/id" className="btn">
            Generate Your Digital ID
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section id="about">
        <h2>About Us</h2>
        <div className="about">
          <div className="about-text">
            <p>
              We are dedicated to ensuring tourist safety through AI,
              blockchain, and geo-fencing. Our system provides real-time
              monitoring, emergency response, and tamper-proof digital
              identities for every tourist, especially in high-risk regions like
              the Northeast where traditional methods are insufficient.
            </p>
            <p>
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
        <h2>Features</h2>
        <div className="features">
          <Link to="/id" className="card-link">
            <div className="card" style={{ margin: "10px" }}>
              <h3>Blockchain ID</h3>
              <p>Unique, tamper-proof IDs issued at entry points.</p>
            </div>
          </Link>
          <Link to="/geofencing">
            <div className="card">
              <h3>Geo-Fencing</h3>
              <p>Alerts when tourists enter restricted zones.</p>
            </div>
          </Link>
          <Link to="/panicbutton">
            <div className="card">
              <h3>Panic Button</h3>
              <p>Instant SOS with live location to police & contacts.</p>
            </div>
          </Link>
          <Link to="/aimonitoring">
            <div className="card">
              <h3>AI Monitoring</h3>
              <p>Detects anomalies like inactivity or route deviation.</p>
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
            <h3>Dashboard</h3>
            <p>Real-time visualizations for tourism authorities.</p>
          </div>

          <Link to="/dataprivacy">
            <div className="card">
              <h3>Data Privacy</h3>
              <p>Your personal information is encrypted & secure.</p>
            </div>
          </Link>
          <Link to="/touristinsights">
            <div className="card">
              <h3>Tourist Insights</h3>
              <p>Smart analytics help improve tourism services.</p>
            </div>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <h2>What Tourists Say</h2>
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

      {/* Dashboard */}
      <section id="dashboard">
        <h2>Tourism Dashboard</h2>
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
        <h2>Frequently Asked Questions</h2>

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
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="4" placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
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
