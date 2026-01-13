import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    LineChart
} from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    DatasetComponent, // Often used, safe to include or remove if unused, but tooltip/grid are definitely used
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useDateFilter } from '../../context/DateFilterContext';
import { useMemo, useState, memo } from 'react';

// Register the required components
echarts.use(
    [LineChart, GridComponent, TooltipComponent, CanvasRenderer, DatasetComponent]
);

function ChartSection() {
    const { activePeriod, dateRange } = useDateFilter();
    const [showSelected, setShowSelected] = useState(true);
    const [showCompare, setShowCompare] = useState(true);

    const dates = useMemo(() => {
        let start = new Date();
        let end = new Date();
        const today = new Date();

        switch (activePeriod) {
            case '1D':
                start = new Date(today.setHours(0, 0, 0, 0));
                end = new Date(today.setHours(23, 59, 59, 999));
                break;
            case '1W':
                start = new Date(today);
                start.setDate(today.getDate() - 6);
                break;
            case '1M':
                start = new Date(today);
                start.setMonth(today.getMonth() - 1);
                break;
            case '6M':
                start = new Date(today);
                start.setMonth(today.getMonth() - 6);
                break;
            case '1Y':
                start = new Date(today);
                start.setFullYear(today.getFullYear() - 1);
                break;
            case 'Select Period':
                if (dateRange && dateRange.start && dateRange.end) {
                    start = new Date(dateRange.start);
                    end = new Date(dateRange.end);
                } else {
                    // Default fallback if no range selected yet
                    start = new Date(today);
                    start.setDate(today.getDate() - 6);
                }
                break;
            default:
                start = new Date(today);
                start.setDate(today.getDate() - 6);
        }

        const dateArray = [];
        let current = new Date(start);
        const timeDiff = end.getTime() - start.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        let step = 1;
        if (dayDiff > 60) step = 5;
        if (dayDiff > 180) step = 15;

        // If 1D, we might want hours instead of days, but keeping simple for now
        if (activePeriod === '1D') {
            // For 1D, just show a few points for the day
            for (let i = 0; i < 24; i += 4) {
                const d = new Date(start);
                d.setHours(i);
                dateArray.push(d);
            }
        } else {
            while (current <= end) {
                dateArray.push(new Date(current));
                current.setDate(current.getDate() + step);
            }
        }

        return dateArray.map(d => {
            if (activePeriod === '1D') return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        });
    }, [activePeriod, dateRange]);

    const generateData = (length: number, magnitude: number) => {
        return Array.from({ length }, (_, i) => Math.floor(Math.random() * magnitude) + 15 + (i * 0.5));
    };

    const selectedPeriodData = useMemo(() => generateData(dates.length, 60), [dates]);
    const comparePeriodData = useMemo(() => generateData(dates.length, 15).map(v => v * 0.3), [dates]);

    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            padding: [10, 15],
            textStyle: {
                color: '#333'
            },
            extraCssText: 'box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 4px;'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: '#f0f0f0'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
            axisLabel: {
                color: '#999',
                interval: activePeriod === '1Y' ? 'auto' : 0, // dynamic interval
                rotate: dates.length > 10 ? 45 : 0
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            },
            axisLabel: {
                color: '#999',
                formatter: (value: number) => {
                    if (value >= 100) return '1Cr';
                    if (value >= 80) return '80L';
                    if (value >= 60) return '60L';
                    if (value >= 40) return '40L';
                    if (value >= 20) return '20L';
                    return '0';
                }
            }
        },
        series: [
            {
                name: 'Selected period',
                type: 'line',
                showSymbol: false,
                smooth: true,
                data: showSelected ? selectedPeriodData : [],
                itemStyle: {
                    color: '#ff9f43'
                },
                lineStyle: {
                    width: 2
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255, 159, 67, 0.2)'
                        }, {
                            offset: 1, color: 'rgba(255, 159, 67, 0)'
                        }]
                    }
                }
            },
            {
                name: 'Compare period',
                type: 'line',
                showSymbol: false,
                smooth: true,
                data: showCompare ? comparePeriodData : [],
                itemStyle: {
                    color: '#ff9f43'
                },
                lineStyle: {
                    width: 2,
                    type: 'dashed'
                }
            }
        ]
    };

    return (
        <div className="chart-section">
            <div className="chart-header">
                <h2>Gross Merchandise Value</h2>
                <div className="legend-container">
                    <div
                        className={`legend-item ${!showSelected ? 'inactive' : ''}`}
                        onClick={() => setShowSelected(!showSelected)}
                        style={{ cursor: 'pointer', opacity: showSelected ? 1 : 0.5 }}
                    >
                        <div className="legend-line solid"></div>
                        <span>Selected period</span>
                    </div>
                    <div
                        className={`legend-item ${!showCompare ? 'inactive' : ''}`}
                        onClick={() => setShowCompare(!showCompare)}
                        style={{ cursor: 'pointer', opacity: showCompare ? 1 : 0.5 }}
                    >
                        <div className="legend-line dashed"></div>
                        <span>Compare period</span>
                    </div>
                </div>
                <div className="chart-filters">
                    <span>GMV</span>
                </div>
            </div>
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                style={{ height: '350px' }}
            />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '10px', fontStyle: 'italic' }}>
                Updated {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} @ {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
}

export default memo(ChartSection);
