import React from "react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai"; // Using swap icon for random icon in image if needed, or similar.
// Actually, looking at the image, specifically "Andaman And Nicobar Islands" has an icon.
// The image shows a shuffle/swap icon next to "Andaman And Nicobar Islands".
// Let's import it.

interface BreakdownData {
  name: string;
  value: string;
  subValue?: string; // For tooltip or extra text if any
  change: string;
  isIncrease: boolean | null; // true = green/up, false = red/down, null = neutral
}

interface BreakdownCardProps {
  title: string;
  updatedAt: string;
  columns: string[];
  data: BreakdownData[];
}

const BreakdownCard: React.FC<BreakdownCardProps> = ({
  title,
  updatedAt,
  columns,
  data,
}) => {
  return (
    <div className="breakdown-card">
      <div className="breakdown-header">
        <h3 className="breakdown-title">{title}</h3>
        <div className="filter-icon-wrapper">
          <span className="filter-count">2</span>
          <FaFilter className="filter-icon" />
        </div>
      </div>

      <div className="breakdown-table-header">
        {columns.map((col, index) => (
          <span key={index} className="table-head">
            {col}
          </span>
        ))}
      </div>

      <div className="breakdown-list">
        {data.map((item, index) => (
          <div key={index} className="breakdown-item">
            <div className="item-left-content">
              <div className="icon-wrapper has-tooltip-trigger">
                <AiOutlineSwap className="swap-icon" />
                {/* <div className="custom-tooltip">
                  Cross-filter and refresh the dashboard
                </div> */}
              </div>
              <div className="item-name has-tooltip-trigger">
                {item.name}
                <div className="custom-tooltip">{item.name}</div>
              </div>
            </div>

            <div className="item-stats">
              <div className="item-value">{item.value}</div>
              <div
                className={`item-change ${item.isIncrease === true
                  ? "positive"
                  : item.isIncrease === false
                    ? "negative"
                    : "neutral"
                  }`}
              >
                {item.isIncrease === true && "↗ "}
                {item.isIncrease === false && "↘ "}
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="breakdown-footer">
        <span className="clock-icon">🕒</span> {updatedAt}
      </div>
    </div>
  );
};

export default BreakdownCard;
