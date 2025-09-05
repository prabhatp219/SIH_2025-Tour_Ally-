import React from "react";

export default function Touristinsights() {
  return (
    <div className="container">
      {/* Section Header */}
      <div className="section-header">
        <h1>Tourist Insights</h1>
        <p>
          Smart analytics help improve tourism services and ensure a safer, better experience for visitors.
        </p>
      </div>

      {/* Insights Cards */}
      <div className="insights-cards">
        <div className="card">
          <h3>Enhance Tourist Services</h3>
          <p>
            Tailor services and recommendations to visitor preferences using real-time data.
          </p>
        </div>
        <div className="card">
          <h3>Optimize Resource Management</h3>
          <p>
            Predict peak tourist times and allocate resources efficiently to avoid overcrowding.
          </p>
        </div>
        <div className="card">
          <h3>Improve Safety</h3>
          <p>
            Monitor incident reports and identify high-risk areas to ensure visitor safety.
          </p>
        </div>
        <div className="card">
          <h3>Boost Local Economy</h3>
          <p>
            Guide tourists toward local attractions and businesses, increasing community revenue.
          </p>
        </div>
        <div className="card">
          <h3>Analyze Visitor Trends</h3>
          <p>
            Understand where tourists go most frequently and what activities they prefer.
          </p>
        </div>
        <div className="card">
          <h3>Reduce Environmental Impact</h3>
          <p>
            Track tourist activity to minimize strain on natural resources and preserve sites.
          </p>
        </div>
        <div className="card">
          <h3>Enhance Transportation</h3>
          <p>
            Use data to improve traffic flow, public transit, and pedestrian safety for tourists.
          </p>
        </div>
        <div className="card">
          <h3>Personalized Recommendations</h3>
          <p>
            Offer customized travel plans and experiences based on individual preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
