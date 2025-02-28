"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const FilterSection = dynamic(() => import("./filter-section"));
import TableBodySection from "./table-body-section";
import useFetch from "@/app/hooks/useFetch";

export default function AttendanceList() {
  const [dateRange, setDateRange] = useState<"today" | "week" | "month">(
    "today"
  );

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const buildUrl = () => {
      const params = new URLSearchParams();
      const today = new Date();
      const formatDate = (date: Date) => date.toISOString().split("T")[0];

      switch (dateRange) {
        case "today":
          params.set("from", formatDate(today));
          break;
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          params.set("from", formatDate(weekAgo));
          params.set("to", formatDate(today));
          break;
        case "month":
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          params.set("from", formatDate(monthAgo));
          params.set("to", formatDate(today));
          break;
      }

      return `/api/v1/attendance/list?${params}`;
    };

    setUrl(buildUrl());
  }, [dateRange]);

  const { data, isLoading, isError } = useFetch(url);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching attendance list:", isError);
    }
  }, [isError]);

  return (
    <div className="container mx-auto py-10">
      <FilterSection dateRange={dateRange} setDateRange={setDateRange} />

      <TableBodySection attendanceListData={data} loading={isLoading} />
    </div>
  );
}
