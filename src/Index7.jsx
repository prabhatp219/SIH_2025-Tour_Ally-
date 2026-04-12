import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthed, clearToken } from "./auth";

const Index7 = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ tourists: 0, support: 0, reliability: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);
  const heroRef = useRef(null);

  /* ---- scroll listener for sticky navbar ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- mouse parallax for hero ---- */
  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (e.clientY < rect.bottom) {
        setMousePos({
          x: ((e.clientX / window.innerWidth) - 0.5) * 30,
          y: ((e.clientY / window.innerHeight) - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ---- animated counter via IntersectionObserver ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          const duration = 2200;
          const targets = { tourists: 50000, support: 24, reliability: 99.9 };
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const p = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setStats({
              tourists: Math.floor(ease * targets.tourists),
              support: Math.floor(ease * targets.support),
              reliability: (ease * targets.reliability).toFixed(1),
            });
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  function LoginLogoutButton() {
    const loggedIn = isAuthed();
    if (loggedIn) {
      return (
        <button
          className="nav-cta logout-cta"
          onClick={() => { clearToken(); navigate("/signin"); }}
        >
          Logout
        </button>
      );
    }
    return (
      <button className="nav-cta login-cta" onClick={() => navigate("/signin")}>
        Login
      </button>
    );
  }

  const features = [
    {
      icon: "🔐", title: "Blockchain ID",
      desc: "Unique, tamper-proof digital IDs issued at entry points — verified instantly anywhere.",
      link: "/id", color: "#00d4ff", tag: "Secure"
    },
    {
      icon: "🗺️", title: "Geo-Fencing",
      desc: "Smart boundary alerts notify authorities the moment a tourist enters a restricted zone.",
      link: "/geofencing", color: "#a855f7", tag: "Smart"
    },
    {
      icon: "🚨", title: "Panic Button",
      desc: "One-tap SOS sends live location to police, emergency contacts, and local responders.",
      link: "/panicbutton", color: "#ef4444", tag: "Emergency"
    },
    {
      icon: "🤖", title: "AI Monitoring",
      desc: "Machine learning detects anomalies — inactivity spikes, route deviations, distress signals.",
      link: "/aimonitoring", color: "#10b981", tag: "AI"
    },
    {
      icon: "📊", title: "Dashboard",
      desc: "Real-time analytics and live visualizations give authorities full situational awareness.",
      link: null, color: "#f59e0b", tag: "Analytics"
    },
    {
      icon: "🔒", title: "Data Privacy",
      desc: "End-to-end encryption ensures personal data stays private and tamper-resistant.",
      link: "/dataprivacy", color: "#8b5cf6", tag: "Privacy"
    },
    {
      icon: "💡", title: "Tourist Insights",
      desc: "Behavioral analytics help tourism authorities improve services and predict trends.",
      link: "/touristinsights", color: "#06b6d4", tag: "Insights"
    },
    {
      icon: "📍", title: "Live Tracking",
      desc: "Continuous GPS tracking with timestamped logs for full journey accountability.",
      link: "/gpslogsviewer", color: "#22c55e", tag: "GPS"
    },
  ];

  const dashStats = [
    { label: "Active Tourists", value: "1,243", sub: "Currently tracked", pct: 64, color: "#00d4ff" },
    { label: "Alerts Today", value: "47", sub: "High / Medium / Low", pct: 28, color: "#ef4444" },
    { label: "Pending Incidents", value: "8", sub: "Awaiting response", pct: 16, color: "#f59e0b" },
    { label: "Resolved Incidents", value: "312", sub: "Handled by authorities", pct: 82, color: "#10b981" },
    { label: "Safety Score", value: "76 / 100", sub: "Auto-computed from patterns", pct: 76, color: "#a855f7" },
    { label: "Language Support", value: "18 langs", sub: "Active translations", pct: 90, color: "#06b6d4" },
    { label: "Avg. Response Time", value: "12 min", sub: "Emergency dispatch", pct: 40, color: "#f59e0b" },
    { label: "Top Destination", value: "Shillong", sub: "Meghalaya, NE India", pct: 70, color: "#22c55e" },
  ];

  const faqs = [
    {
      q: "How secure is my data?",
      a: "All data is encrypted end-to-end using blockchain technology, making it tamper-proof, immutable, and fully secure from unauthorized access."
    },
    {
      q: "Is this system free for tourists?",
      a: "Yes — digital IDs are issued completely free of cost at airports, hotels, and border entry points across the region."
    },
    {
      q: "Can I access the system offline?",
      a: "Absolutely. Emergency alerts and the panic button function even in low-connectivity or no-signal zones using SMS fallback protocols."
    },
    {
      q: "How fast does the AI Monitoring respond?",
      a: "Our AI engine processes anomaly signals in under 500ms and can dispatch an alert to authorities within 2 minutes of detecting a distress pattern."
    },
  ];

  return (
    <div className="ta-root">

      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <header className={`ta-nav${scrolled ? " ta-nav--solid" : ""}`}>
        <div className="ta-nav__brand">
          <div className="ta-nav__logo">TA</div>
          <div>
            <div className="ta-nav__name">Tour Ally</div>
            <div className="ta-nav__tagline">Safe Travel, Happy Memories</div>
          </div>
        </div>

        <nav className="ta-nav__links">
          {["home", "about", "features", "dashboard", "contact"].map((id) => (
            <button key={id} className="ta-nav__link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <LoginLogoutButton />
        </nav>
      </header>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section id="home" className="ta-hero" ref={heroRef}>
        {/* Layered gradient + photo background */}
        <div
          className="ta-hero__bg"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        />
        <div className="ta-hero__overlay" />

        {/* Floating orbs */}
        <div className="ta-orb ta-orb--1" />
        <div className="ta-orb ta-orb--2" />
        <div className="ta-orb ta-orb--3" />

        {/* Animated particles */}
        <div className="ta-particles" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="ta-particle" style={{ "--pi": i }} />
          ))}
        </div>

        {/* Hero content */}
        <div className="ta-hero__content">
          <div className="ta-hero__badge">
            <span className="ta-badge-dot" />
            AI-Powered Tourist Safety Platform
          </div>

          <h1 className="ta-hero__title">
            Smart Tourist Safety &amp;{" "}
            <span className="ta-gradient-text">Digital ID</span>
          </h1>

          <p className="ta-hero__desc">
            Every tourist is equipped with a tamper-proof blockchain-based Digital ID,
            ensuring seamless identity verification, uncompromised security, and
            real-time protection powered by AI-driven monitoring and predictive alerts.
          </p>

          <div className="ta-hero__actions">
            <Link to="/id" className="ta-btn ta-btn--primary">
              <span>🔐</span> Generate Your Digital ID
            </Link>
            <button className="ta-btn ta-btn--ghost" onClick={() => navigate("/chatbot")}>
              <span>🤖</span> AI ChatBot
            </button>
          </div>

          <div className="ta-hero__mini-stats">
            <div className="ta-mini-stat">
              <strong>50K+</strong><span>Protected</span>
            </div>
            <div className="ta-mini-divider" />
            <div className="ta-mini-stat">
              <strong>24/7</strong><span>Support</span>
            </div>
            <div className="ta-mini-divider" />
            <div className="ta-mini-stat">
              <strong>99.9%</strong><span>Uptime</span>
            </div>
          </div>
        </div>

        {/* Floating UI cards (decorative) */}
        <div className="ta-hero__float-group" aria-hidden="true">
          <div className="ta-float-card ta-float-card--a">
            <div className="ta-live-dot" />
            <span>Live Monitoring</span>
            <div className="ta-float-val">1,243 Active</div>
          </div>
          <div className="ta-float-card ta-float-card--b">
            <div style={{ fontSize: "1.8rem" }}>🛡️</div>
            <div>Safety Score</div>
            <div className="ta-float-val">76 / 100</div>
          </div>
          <div className="ta-float-card ta-float-card--c">
            <div className="ta-ring-pulse" />
            <div>AI Alert</div>
            <div className="ta-float-val ta-float-val--amber">Low Risk Zone</div>
          </div>
          <div className="ta-float-card ta-float-card--d">
            <div style={{ fontSize: "1.4rem" }}>📍</div>
            <div>GPS Tracking</div>
            <div className="ta-float-val">Active</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ta-scroll-hint">
          <div className="ta-scroll-mouse"><div className="ta-scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ============================================================
          ABOUT
      ============================================================ */}
      <section id="about" className="ta-section ta-about">
        <div className="ta-section-connector" aria-hidden="true" />
        <div className="ta-section-label">Our Mission</div>
        <h2 className="ta-section-title">Revolutionizing Tourist Safety</h2>
        <p className="ta-section-sub">
          Cutting-edge technology for every explorer&apos;s peace of mind
        </p>

        <div className="ta-about__grid">
          <div className="ta-about__text">
            <h3>Your Trusted Travel Safety Partner</h3>
            <p>
              We are dedicated to ensuring tourist safety through AI, blockchain, and geo-fencing.
              Our system provides real-time monitoring, emergency response, and tamper-proof digital
              identities for every tourist — especially in high-risk regions like Northeast India
              where traditional methods are insufficient.
            </p>
            <p>
              Our mission is simple:{" "}
              <strong className="ta-highlight">Safe Travel, Happy Memories</strong>.
              With technology-driven solutions, we aim to protect tourists while supporting
              local authorities in managing incidents effectively.
            </p>
            <div className="ta-badges">
              <span className="ta-badge">🔐 Blockchain Secured</span>
              <span className="ta-badge">🤖 AI Powered</span>
              <span className="ta-badge">📍 Real-time GPS</span>
              <span className="ta-badge">🛡️ 24/7 Protection</span>
            </div>
          </div>

          <div className="ta-about__visual">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              alt="Tourism landscape"
              className="ta-about__img"
            />
            <div className="ta-about__img-chip">Northeast India Safety Network</div>
          </div>
        </div>

        {/* Animated stat counters */}
        <div className="ta-stats-row" ref={statsRef}>
          {[
            { num: `${stats.tourists.toLocaleString()}+`, label: "Tourists Protected", icon: "👤", color: "#00d4ff" },
            { num: `${stats.support}/7`, label: "Emergency Support", icon: "⚡", color: "#a855f7" },
            { num: `${stats.reliability}%`, label: "System Reliability", icon: "🎯", color: "#10b981" },
          ].map((s, i) => (
            <div key={i} className="ta-stat-card" style={{ "--sc": s.color }}>
              <div className="ta-stat-card__top">
                <span className="ta-stat-card__num">{s.num}</span>
                <span className="ta-stat-card__icon">{s.icon}</span>
              </div>
              <div className="ta-stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FEATURES
      ============================================================ */}
      <section id="features" className="ta-section ta-features">
        <div className="ta-features__glow" aria-hidden="true" />
        <div className="ta-section-label">What We Offer</div>
        <h2 className="ta-section-title">Comprehensive Safety Features</h2>
        <p className="ta-section-sub">
          Advanced technology solutions designed to keep you safe and secure throughout your travels
        </p>

        <div className="ta-features__grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="ta-feat-card"
              style={{ "--fc": f.color }}
              onClick={() => f.link ? navigate(f.link) : scrollTo("dashboard")}
            >
              <div className="ta-feat-card__shine" aria-hidden="true" />
              <div className="ta-feat-card__top">
                <span className="ta-feat-icon">{f.icon}</span>
                <span className="ta-feat-tag" style={{ color: f.color, borderColor: f.color + "44", background: f.color + "11" }}>
                  {f.tag}
                </span>
              </div>
              <h3 className="ta-feat-title" style={{ color: f.color }}>{f.title}</h3>
              <p className="ta-feat-desc">{f.desc}</p>
              <div className="ta-feat-arrow">Explore →</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="ta-testimonials">
          <div className="ta-section-label" style={{ marginTop: "80px" }}>Testimonials</div>
          <h2 className="ta-section-title">What Tourists Say</h2>
          <div className="ta-testimonials__row">
            {[
              {
                text: "The digital ID gave me complete peace of mind while exploring remote areas of Meghalaya. I felt genuinely safe throughout my journey!",
                name: "Riya Sharma",
                role: "Tourist from Delhi",
                initials: "RS",
              },
              {
                text: "Thanks to the panic button, local police arrived in under 3 minutes when we faced a road emergency. Absolutely brilliant system!",
                name: "John Miller",
                role: "Tourist from USA",
                initials: "JM",
              },
            ].map((t, i) => (
              <div key={i} className="ta-test-card">
                <div className="ta-test-quote">&ldquo;</div>
                <p>{t.text}</p>
                <div className="ta-test-author">
                  <div className="ta-test-avatar">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DASHBOARD
      ============================================================ */}
      <section id="dashboard" className="ta-section ta-dashboard">
        <div className="ta-section-label">Live Analytics</div>
        <h2 className="ta-section-title">Tourism Dashboard</h2>
        <p className="ta-section-sub">Real-time monitoring and safety analytics at a glance</p>

        <div className="ta-dash__grid">
          {dashStats.map((d, i) => (
            <div key={i} className="ta-dash-card" style={{ "--dc": d.color }}>
              <div className="ta-dash-card__header">
                <span className="ta-dash-card__label">{d.label}</span>
                <span className="ta-dash-card__value" style={{ color: d.color }}>{d.value}</span>
              </div>
              <div className="ta-dash-card__sub">{d.sub}</div>
              <div className="ta-dash-bar">
                <div
                  className="ta-dash-bar__fill"
                  style={{ width: `${d.pct}%`, background: d.color }}
                />
              </div>
              <div className="ta-dash-card__pct" style={{ color: d.color }}>{d.pct}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FAQ
      ============================================================ */}
      <section className="ta-section ta-faq">
        <div className="ta-section-label">Support</div>
        <h2 className="ta-section-title">Frequently Asked Questions</h2>

        <div className="ta-faq__list">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`ta-faq-item${faqOpen === i ? " ta-faq-item--open" : ""}`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="ta-faq-item__q">
                <span>{f.q}</span>
                <span className="ta-faq-item__icon">{faqOpen === i ? "−" : "+"}</span>
              </div>
              <div className="ta-faq-item__a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          CONTACT
      ============================================================ */}
      <section id="contact" className="ta-section ta-contact">
        <div className="ta-section-label">Reach Us</div>
        <h2 className="ta-section-title">Get in Touch</h2>
        <p className="ta-section-sub">We&apos;re here to help — 24 hours a day, 7 days a week</p>

        <div className="ta-contact__layout">
          <form className="ta-contact__form" onSubmit={(e) => e.preventDefault()}>
            <h3 className="ta-contact__form-title">Send a Message</h3>
            <div className="ta-form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="ta-form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" required />
            </div>
            <div className="ta-form-group">
              <label>Message <span style={{ color: "#64748b" }}>(max 500 chars)</span></label>
              <textarea rows="5" placeholder="Tell us how we can help you..." maxLength="500" />
            </div>
            <button type="submit" className="ta-btn ta-btn--primary" style={{ width: "100%", justifyContent: "center" }}>
              Send Message →
            </button>
          </form>

          <div className="ta-contact__info">
            {[
              {
                icon: "📞", title: "24/7 Emergency Support",
                lines: ["For immediate assistance:", "+1-800-SAFE-TOUR", "(+1-800-723-3868)"],
                accent: "#f59e0b",
              },
              {
                icon: "✉️", title: "Email Support",
                lines: ["General inquiries:", "support@smarttouristsafety.com"],
                accent: "#3b82f6",
              },
              {
                icon: "⏱️", title: "Response Time",
                lines: ["Emergency: < 2 min", "General: < 4 hrs", "Technical: < 24 hrs"],
                accent: "#a855f7",
              },
            ].map((box, i) => (
              <div key={i} className="ta-info-box" style={{ "--ib": box.accent }}>
                <div className="ta-info-box__icon">{box.icon}</div>
                <h4>{box.title}</h4>
                {box.lines.map((l, j) => <p key={j}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="ta-footer">
        <div className="ta-footer__brand">
          <div className="ta-nav__logo" style={{ width: 34, height: 34, fontSize: "0.75rem" }}>TA</div>
          <span>Tour Ally</span>
        </div>
        <p className="ta-footer__copy">© 2025 Smart Tourist Safety — All rights reserved.</p>
        <div className="ta-footer__links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </div>
      </footer>

    </div>
  );
};

export default Index7;
