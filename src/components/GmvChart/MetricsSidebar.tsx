import { IoFilterOutline } from "react-icons/io5";

export default function MetricsSidebar() {
    const metrics = [
        { label: 'Session', value: '1.78Cr', change: '+275%', isPositive: true },
        { label: 'Orders', value: '6.99L', change: '+184%', isPositive: true },
        { label: 'AOV', value: '₹941.95', change: '+26%', isPositive: true },
        { label: 'Conversion', value: '3.78%', change: '-27%', isPositive: false },
        { label: 'TACOS', value: '15.90%', change: '-29%', isPositive: true },
    ];

    return (
        <div className="metrics-sidebar">
            <div className="sidebar-header">
                <h3>Compare Metrics</h3>
                <div style={{ display: 'flex', gap: '5px', color: '#999', cursor: 'pointer' }}>
                    <span>Label</span>
                    <IoFilterOutline />
                </div>
            </div>

            <div className="metrics-list">
                {metrics.map((metric, index) => (
                    <div key={index} className="metric-item">
                        <div className="metric-label-row">
                            <input type="checkbox" className="metric-checkbox" />
                            <span className="metric-name">{metric.label}</span>
                        </div>
                        <div className="metric-value-row">
                            <span className="metric-value">{metric.value}</span>
                            <span className={`metric-change ${metric.isPositive ? 'positive' : 'negative'}`}>
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
                <div className="metric-item">
                    <div className="metric-label-row">
                        <input type="checkbox" className="metric-checkbox" />
                        <span className="metric-name">SKU Availability %</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
