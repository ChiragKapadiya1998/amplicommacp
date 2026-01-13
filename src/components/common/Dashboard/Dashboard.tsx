import { useState, memo, lazy, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
// import Loading from "../../common/Loading/Loading";

const GmvBreakdown = lazy(() => import("./GmvBreakdown"));

interface BreakdownItem {
  title: string;
  updatedAt: string;
  columns: string[];
  data: any[];
}

interface DashboardProps {
  breakdownData: BreakdownItem[];
  tabsData: any[];
}

const Dashboard = ({ breakdownData, tabsData }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>("Seller");
  const [selectedMetric, setSelectedMetric] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (tabsData && tabsData.length > 0) {
      setActiveTab(tabsData[0].category);
    }
  }, [tabsData]);

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
      {tabsData && tabsData?.length > 0 ? (
        tabsData?.map((tab) => (
          <span
            key={tab.dashboard_id}
            className={`tab ${activeTab === tab.category ? "active" : ""}`}
            onClick={() => setActiveTab(tab.category)}
          >
            {tab.category}
          </span>
        ))
      ) : (
        <span>Loading Tabs...</span>
      )}

      {/* Metrics */}
      <div className="metrics-card">
        {metricsData.map((metric: { label: string; value: string; isIncrease: boolean; change: string }, index: number) => (
          <div
            key={index}
            className={`metric ${index === selectedMetric ? "metric-primary active-border" : ""}`}
            onClick={() => setSelectedMetric(index)}
            style={{ cursor: "pointer" }}
          >
            <span className="label text-uppercase">{metric.label}</span>
            <div className="metric-header">
              <div className="metric-value">
                {metric.value}
                <span className={`badge ${metric.isIncrease ? "green" : "red"}`}>
                  {metric.isIncrease ? "↗" : "↓"} {metric.change}
                </span>
              </div>
              {index === selectedMetric && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/reports");
                  }}
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
      {/* <Suspense fallback={<SkeletonLoader height="200px" />}> */}
      <GmvBreakdown breakdownData={breakdownData} />
      {/* </Suspense> */}
      <div className="top-performers under-performers">Under-Performers</div>
      {/* <Suspense fallback={<SkeletonLoader height="200px" />}> */}
      <GmvBreakdown breakdownData={breakdownData} />
      {/* </Suspense> */}
    </div>
  );
};

export default memo(Dashboard);
