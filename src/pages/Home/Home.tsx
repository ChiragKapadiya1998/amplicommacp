import { Dashboard, FiltersBar } from "../../components";
import { memo, lazy, Suspense, useEffect, useState } from "react";
// import Loading from "../../components/common/Loading/Loading";
import SkeletonLoader from "../../components/common/Loading/SkeletonLoader";
import axios from "axios";

const GmvChart = lazy(() => import("../../components/GmvChart/GmvChart"));

interface BreakdownItem {
  title: string;
  updatedAt: string;
  columns: string[];
  data: any[];
}

function Home() {
  const [breakdownData, setBreakdownData] = useState<BreakdownItem[]>([]);
  const [tabsData, setTabsData] = useState<any[]>([]);
  console.log(breakdownData);
  useEffect(() => {
    let data = JSON.stringify({
      dashboard_id: "87",
      selected_filters: {},
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://stage-superset.amplicommacp.com/api/v1/dashboard/get_dashboard_filters/",
      headers: {
        "x-guesttoken":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJzdHJpbmciLCJsYXN0X25hbWUiOiJzdHJpbmciLCJ1c2VybmFtZSI6ImFkbWluIn0sInJlc291cmNlcyI6W3siaWQiOiIxMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMiIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTUiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjI2IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIzMCIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMjgiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjYiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjMxIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI0NSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiOTIiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjgyIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI4NSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiODQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjgzIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI3NCIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNTciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg3IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI5OSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTAwIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDYiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNzMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg5IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwMiIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNDciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjQ2IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTIiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwNyIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTEzIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTAiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjQ4IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjkwIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjExMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNDkiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwNSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNjMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg4IiwidHlwZSI6ImRhc2hib2FyZCJ9XSwicmxzX3J1bGVzIjpbXSwibWV0YSI6eyJ1c2VyX2lkIjoxfSwiaWF0IjoxNzY4MjE4NDc5LjcxMDU2MjcsImV4cCI6MTc2ODgyMzI3OS43MTA1NjI3LCJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwLyIsInR5cGUiOiJndWVzdCJ9.HhnV9U_iLw8S5cZjMCo2QbfnT24ZrpCfz-Ln3ldVdic",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setBreakdownData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Second API Call for Tabs
    let tabConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://stage-superset.amplicommacp.com/api/v1/dashboard/home_dashboard_mapping/',
      headers: {
        'x-guesttoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJzdHJpbmciLCJsYXN0X25hbWUiOiJzdHJpbmciLCJ1c2VybmFtZSI6ImFkbWluIn0sInJlc291cmNlcyI6W3siaWQiOiIxMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMiIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTUiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjI2IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIzMCIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMjgiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjYiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjMxIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI0NSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiOTIiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjgyIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI4NSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiODQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjgzIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI3NCIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNTciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg3IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiI5OSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTAwIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDYiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNzMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg5IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwMiIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNDciLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjQ2IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTIiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwNyIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiMTEzIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTAiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjQ4IiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMTQiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjkwIiwidHlwZSI6ImRhc2hib2FyZCJ9LHsiaWQiOiIxMDMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjExMSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNDkiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6IjEwNSIsInR5cGUiOiJkYXNoYm9hcmQifSx7ImlkIjoiNjMiLCJ0eXBlIjoiZGFzaGJvYXJkIn0seyJpZCI6Ijg4IiwidHlwZSI6ImRhc2hib2FyZCJ9XSwicmxzX3J1bGVzIjpbXSwibWV0YSI6eyJ1c2VyX2lkIjoxfSwiaWF0IjoxNzY4MjE4NDc5LjcxMDU2MjcsImV4cCI6MTc2ODgyMzI3OS43MTA1NjI3LCJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwLyIsInR5cGUiOiJndWVzdCJ9.HhnV9U_iLw8S5cZjMCo2QbfnT24ZrpCfz-Ln3ldVdic',
        'Cookie': 'async-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFubmVsIjoiYjZiZDhiNzYtYTIyZC00YTI2LWFmN2YtYTk5MzMxNWRjMGQzIiwic3ViIjoiMSJ9.XhjYBBPFhMZhop68P-jKxe4AghOXEYFyvRc_qVWgpe8; session=.eJw1zEEKgCAQQNG7zFohtbS6jIzOiIEYJC0iunsStPub92_w6eCWYU1YGgvAdtXoY8ZaufiNYIVgA83BWYlakxxR90ouSVwWY9REcSADvzwbHx9TAsoesXA_cIXnBTryIa0.aWTpSg.b54E0GY5Er8XjwqhyGIOgu-QyaY'
      }
    };

    axios.request(tabConfig)
      .then((response) => {
        // Assuming response.data contains the list of tabs, need to verify
        // For now, logging to inspect structure if needed
        console.log("Tabs Data:", response.data);
        if (Array.isArray(response.data?.result)) {
          setTabsData(response.data?.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div style={{}}>
      <FiltersBar />
      <Dashboard breakdownData={breakdownData} tabsData={tabsData} />
      <div style={{ padding: '20px' }}>
        <Suspense fallback={<SkeletonLoader height="350px" />}>
          <GmvChart />
        </Suspense>
      </div>
      {/* <h1>Home Dashboard Content</h1> */}
    </div>
  );
}

export default memo(Home);
