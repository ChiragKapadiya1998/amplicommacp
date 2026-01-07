import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Reports() {
  const [activeDashboard, setActiveDashboard] = useState("DASH_1");
  const { id } = useParams();
  const navigate = useNavigate();
  const dashboardUrl =
    activeDashboard === "DASH_1"
      ? "https://wikipedia.org"
      : "https://codesandbox.io";

  return (
    <div style={{ height: "100%" }}>
      {/* Top controls / navigation */}
      <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
        <button onClick={() => setActiveDashboard("DASH_1")}>
          Dashboard 1
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setActiveDashboard("DASH_2")}
        >
          Dashboard 2
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setActiveDashboard("DASH_1");
            navigate("/info");
          }}
        >
          Dashboard 3
        </button>
      </div>

      {/* Iframe */}
      <iframe
        src={dashboardUrl}
        title="Dashboard"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: "calc(100% - 50px)" }}
      />
    </div>
  );
}
