import { useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import GmvBreakdown from "./GmvBreakdown";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Seller");
  const navigate = useNavigate();

  const tabs = ["Seller", "Primary", "Secondary"];

  const metricsData = [
    {
      label: "GMV",
      value: "₹94.58K",
      change: "-67%",
      isIncrease: false,
    },
    {
      label: "TACOS",
      value: "5.85%",
      change: "-77%",
      isIncrease: false,
    },
    {
      label: "CONVERSION %",
      value: "91.24%",
      change: "+231%",
      isIncrease: true,
    },
    {
      label: "SKU AVAILABILITY %",
      value: "82.96%",
      change: "-0.8%",
      isIncrease: false,
    },
  ];

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
        {metricsData.map((metric: { label: string; value: string; isIncrease: boolean; change: string }, index: number) => (
          <div
            key={index}
            className={`metric ${index === 0 ? "metric-primary active-border" : ""}`}
          >
            <span className="label text-uppercase">{metric.label}</span>
            <div className="metric-header">
              <div className="metric-value">
                {metric.value}
                <span className={`badge ${metric.isIncrease ? "green" : "red"}`}>
                  {metric.isIncrease ? "↗" : "↓"} {metric.change}
                </span>
              </div>
              {index === 0 && (
                <button
                  onClick={() => navigate("/reports")}
                  className="analyze-btn"
                >
                  Analyze
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
  

      <div className="top-performers">Top-Performers</div>
      <GmvBreakdown />
       <div className="top-performers under-performers">Under-Performers</div>
      <GmvBreakdown />
    </div>
  );
};

export default Dashboard;
