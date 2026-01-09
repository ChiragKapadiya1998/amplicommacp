import ChartSection from './ChartSection';
import MetricsSidebar from './MetricsSidebar';
import './GmvChart.css';

export default function GmvChart() {
    return (
        <div className="gmv-chart-container">
            <ChartSection />
            <MetricsSidebar />
        </div>
    );
}
