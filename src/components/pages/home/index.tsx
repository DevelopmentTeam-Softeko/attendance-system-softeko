"use client";
import React from "react";
import dynamic from "next/dynamic";
import AttendanceSystemSkeleton from "./attendance-system-skeleton";
import useFetch from "@/app/hooks/useFetch";
import { GetCurrentEmployeeResponse } from "@/utils/APIType";

const AttendanceSystem = dynamic(
  () => import("@/components/pages/home/attendance-system"),
  {
    loading: () => <AttendanceSystemSkeleton />,
  }
);

const HomeIndex = () => {
  const employeeId = 130;

  const { data, isError, isLoading } = useFetch(
    `/api/v1/attendance/${employeeId}/current-day`
  );

  if (isLoading) {
    return <AttendanceSystemSkeleton />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <AttendanceSystem
        employeeAttendance={data as GetCurrentEmployeeResponse}
      />
    </div>
  );
};

export default HomeIndex;
