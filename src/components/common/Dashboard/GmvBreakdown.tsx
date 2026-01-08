import React from "react";
import breakdownData from "./GmvBreakdown.json";
import BreakdownCard from "./BreakdownCard";
import "./Dashboard.css";

const GmvBreakdown = () => {
  return (
    <div className="gmv-breakdown-container">
      {breakdownData.map((card, index) => (
        <BreakdownCard
          key={index}
          title={card.title}
          updatedAt={card.updatedAt}
          columns={card.columns}
          data={card.data}
        />
      ))}
    </div>
  );
};

export default GmvBreakdown;
