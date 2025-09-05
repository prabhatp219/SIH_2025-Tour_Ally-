import React from "react";

export default function Dataprivacy() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Smart Tourist Data Privacy & Security</h1>
          <p>
            We protect your location, travel itinerary, and personal data while
            ensuring real-time safety monitoring during your travels.
          </p>
        </div>
      </section>

      {/* How Data is Secured */}
      <section style={{ background: "#1e293b" }}>
        <div className="container">
          <div className="section-title">
            <h2>How We Secure Tourist Data</h2>
            <p>
              Our system uses advanced technology to keep your personal and
              travel data safe at all times.
            </p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="feature-icon">🔒</div>
              <h3>Location Encryption</h3>
              <p>
                Your real-time location and route data are encrypted end-to-end,
                ensuring privacy from unauthorized access.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Travel Records</h3>
              <p>
                Itineraries, check-ins, and travel history are stored securely
                on protected servers with multi-layer security.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">📜</div>
              <h3>Blockchain Verification</h3>
              <p>
                Digital Tourist IDs and travel logs are verified via blockchain
                to ensure authenticity and prevent tampering.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">👤</div>
              <h3>Access Control</h3>
              <p>
                Only authorized personnel or emergency contacts can access
                sensitive tourist data when necessary.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Monitoring</h3>
              <p>
                AI-powered monitoring detects anomalies, deviations, and
                potential risks during your trip.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">🧩</div>
              <h3>Minimal Data Usage</h3>
              <p>
                We collect only essential travel and safety information to
                reduce exposure while keeping you secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy Best Practices */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>Tourist Data Privacy Best Practices</h2>
            <p>
              Tips to enhance your safety and privacy while using our smart
              tourist system.
            </p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="feature-icon">🔑</div>
              <h3>Use Secure Devices</h3>
              <p>
                Keep your phone and GPS-enabled devices secure with passwords or
                biometric locks.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">📱</div>
              <h3>Enable Location Permissions Carefully</h3>
              <p>
                Only allow trusted applications to access your location and
                travel data.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">👀</div>
              <h3>Review App Sharing</h3>
              <p>
                Regularly check which apps have access to your travel and safety
                data.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">❌</div>
              <h3>Limit Public Sharing</h3>
              <p>
                Avoid sharing travel plans or location publicly to reduce safety
                risks.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">⚠️</div>
              <h3>Be Alert to Phishing & Scams</h3>
              <p>
                Don’t click suspicious links or provide personal info to unknown
                sources.
              </p>
            </div>
            <div className="card">
              <div className="feature-icon">🧹</div>
              <h3>Clear Old Travel Data</h3>
              <p>
                Regularly remove outdated itineraries, history logs, and unused
                travel records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2025 Smart Tourist Safety System. Designed with ❤️ by Pranjal
          Jaiswal for your security.
        </p>
      </footer>
    </>
  );
}
