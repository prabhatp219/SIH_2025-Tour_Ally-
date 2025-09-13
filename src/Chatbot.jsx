import React, { useState, useRef, useEffect } from "react";

const API_URL = "https://smarttouristsafety.onrender.com/api/chat";
const WEATHER_KEY = "35ac9319a1d4d9fef4159df6f5ae481e"; // <-- replace with your key

export default function Chatbot() {
  const [messages, setMessages] = useState([]); // {role:'user'|'bot', text:''}
  const [prompt, setPrompt] = useState("");
  const [location, setLocation] = useState(null);
  const messagesEndRef = useRef(null);

  // === Auto scroll ===
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // === Get current location automatically ===
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.warn("Location error:", err.message)
    );
  }, []);

  // === Typing animation ===
  const typeText = async (fullText, update) => {
    let typed = "";
    for (let i = 0; i < fullText.length; i++) {
      typed += fullText[i];
      update(typed);
      await new Promise((r) => setTimeout(r, 15));
    }
  };

  // === Reverse geocode helper ===
  const getPlaceName = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_KEY}`;
      const data = await fetch(url).then((r) => r.json());
      if (data && data.length > 0) {
        const { name, state, country } = data[0];
        return `${name}${state ? ", " + state : ""}, ${country}`;
      }
      return "Unknown location";
    } catch {
      return "Location lookup failed";
    }
  };

  // === Weather + location text ===
  const checkWeather = async () => {
    if (!location) return "Location not available.";
    try {
      const [place, weatherData] = await Promise.all([
        getPlaceName(location.lat, location.lon),
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${WEATHER_KEY}`
        ).then((r) => r.json()),
      ]);

      return `📍 ${place}\n🌤 ${weatherData.weather[0].description}, ${weatherData.main.temp}°C (feels like ${weatherData.main.feels_like}°C)`;
    } catch {
      return "Couldn't fetch weather/location.";
    }
  };

  // === Send message ===
  const callAPI = async (userText) => {
    let botIndex;
    setMessages((prev) => {
      const next = [
        ...prev,
        { role: "user", text: userText },
        { role: "bot", text: "AI is typing..." },
      ];
      botIndex = next.length - 1;
      return next;
    });

    // weather shortcut
    if (/weather|temperature|forecast/i.test(userText) && location) {
      const report = await checkWeather();
      setMessages((msgs) =>
        msgs.map((m, i) => (i === botIndex ? { ...m, text: report } : m))
      );
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText, location }),
      });
      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.reply ||
        "No response";

      await typeText(reply, (partial) => {
        setMessages((msgs) =>
          msgs.map((m, i) => (i === botIndex ? { ...m, text: partial } : m))
        );
      });
    } catch (err) {
      setMessages((msgs) =>
        msgs.map((m, i) =>
          i === botIndex ? { ...m, text: "Error: " + err.message } : m
        )
      );
    }
  };

  const handleSend = () => {
    const text = prompt.trim();
    if (!text) return;
    setPrompt("");
    callAPI(text);
  };

  // === Voice input ===
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    const micBtn = document.getElementById("micBtn-react");
    if (!micBtn) return;

    micBtn.addEventListener("click", () => {
      recognition.start();
      micBtn.textContent = "🎙";
    });

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setPrompt(transcript);
      handleSend();
    };
    recognition.onend = () => {
      micBtn.textContent = "🎤";
    };

    return () => recognition.abort();
  }, []);

  // === Speak last bot message ===
  const handleSpeak = () => {
    if (!window.speechSynthesis) return;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    const lastBot = [...messages].reverse().find((m) => m.role === "bot");
    if (lastBot && lastBot.text.trim()) {
      const utterance = new SpeechSynthesisUtterance(lastBot.text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="app">
      <header className="mini">
        <div className="brand">
          <div className="logo">AI</div>
          <div>
            <h1>Mini Chatbot</h1>
            <p>Talk with AI (Text + Voice)</p>
          </div>
        </div>
        <button className="btn" onClick={() => setMessages([])}>
          Clear
        </button>
      </header>

      <main className="chat">
        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="composer">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="btn" onClick={handleSend} aria-label="Send">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
          <button className="btn micBtn" id="micBtn-react">
            🎤
          </button>
          <button className="btn" onClick={handleSpeak}>
            🔊
          </button>
        </div>
      </main>
    </div>
  );
}
