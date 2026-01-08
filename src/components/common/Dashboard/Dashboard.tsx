import { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Seller");
  const navigate = useNavigate();

  const tabs = ["Seller", "Primary", "Secondary"];

  return (
    <div className="dashboard-container">
      {/* Tabs */}
      {tabs.map((tab) => (
        <span
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </span>
      ))}

      {/* Metrics */}
      <div className="metrics-card">
        <div className="metric1 active-border">
          <div className="metric-header">
            <span className="label">GMV</span>
            <button
              onClick={() => {
                navigate("/reports");
              }}
              className="analyze-btn"
            >
              Analyze
            </button>
          </div>
          <div className="metric-value">
            ₹3.77Cr <span className="badge red">↓ -80%</span>
          </div>
        </div>

        <div className="metric">
          <span className="label">TACOS</span>
          <div className="metric-value">
            18.22% <span className="badge green">↓ -19%</span>
          </div>
        </div>

        <div className="metric">
          <span className="label">CONVERSION %</span>
          <div className="metric-value">
            4.20% <span className="badge red">↓ -18%</span>
          </div>
        </div>

        <div className="metric">
          <span className="label">SKU AVAILABILITY %</span>
          <div className="metric-value">
            39.85% <span className="badge red">↓ -50%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
