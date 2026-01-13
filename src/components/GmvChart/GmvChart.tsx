import ChartSection from './ChartSection';
import MetricsSidebar from './MetricsSidebar';
import './GmvChart.css';
import { memo } from 'react';

function GmvChart() {
    return (
        <div className="gmv-chart-container">
            <ChartSection />
            <MetricsSidebar />
        </div>
    );
}

export default memo(GmvChart);
