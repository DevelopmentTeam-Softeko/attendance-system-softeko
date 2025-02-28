import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  dateRange: "today" | "week" | "month";
  setDateRange: (dateRange: "today" | "week" | "month") => void;
};

const FilterSection = ({ dateRange, setDateRange }: Props) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        Records ({dateRange === "today" && "Today"}
        {dateRange === "week" && "Last 7 Days"}
        {dateRange === "month" && "Last 30 Days"})
      </h2>
      <div className="flex space-x-2">
        <Button
          onClick={() => setDateRange("today")}
          variant={dateRange === "today" ? "default" : "outline"}
          size="sm"
        >
          Today
        </Button>
        <Button
          onClick={() => setDateRange("week")}
          variant={dateRange === "week" ? "default" : "outline"}
          size="sm"
        >
          Week
        </Button>
        <Button
          onClick={() => setDateRange("month")}
          variant={dateRange === "month" ? "default" : "outline"}
          size="sm"
        >
          Month
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
