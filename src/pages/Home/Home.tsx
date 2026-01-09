import { Dashboard, FiltersBar, GmvChart } from "../../components";

export default function Home() {
  return (
    <div style={{}}>
      <FiltersBar />
      <Dashboard />
      <div style={{ padding: '20px' }}>
        <GmvChart />
      </div>
      {/* <h1>Home Dashboard Content</h1> */}
    </div>
  );
}
