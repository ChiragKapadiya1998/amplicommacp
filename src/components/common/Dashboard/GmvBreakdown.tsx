import { memo } from "react";
import breakdownData1 from "./GmvBreakdown.json";
import BreakdownCard from "./BreakdownCard";
import "./Dashboard.css";

interface BreakdownItem {
  title: string;
  updatedAt: string;
  columns: string[];
  data: any[];
}

interface GmvBreakdownProps {
  breakdownData: BreakdownItem[];
}

const GmvBreakdown = ({ breakdownData }: GmvBreakdownProps) => {
  console.log("breakdownData1", breakdownData);
  return (
    <div className="gmv-breakdown-container">
      {breakdownData1?.map((card, index) => (
        <BreakdownCard
          key={index}
          title={card?.title}
          updatedAt={card?.updatedAt}
          columns={card?.columns}
          data={card?.data}
        />
      ))}
    </div>
  );
};

export default memo(GmvBreakdown);
