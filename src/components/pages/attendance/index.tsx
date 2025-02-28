"use client";
import useFetch from "@/app/hooks/useFetch";
import React from "react";
import AttendanceList from "./attendance-list";

import { EmployeeAttendanceList } from "@/utils/APIType";
import TableSkeleton from "./skeleton";

const AttendanceIndex = () => {
  const employeeId = 130;
  const { data, isError, isLoading } = useFetch(
    `/api/v1/attendance/${employeeId}`
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <AttendanceList attendanceData={data as EmployeeAttendanceList} />
    </>
  );
};

export default AttendanceIndex;
