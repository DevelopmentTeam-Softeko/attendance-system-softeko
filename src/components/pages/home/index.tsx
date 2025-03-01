import React from "react";
import dynamic from "next/dynamic";
import { GetCurrentEmployeeResponse } from "@/utils/APIType";

import API from "@/utils/API";
import { cookies } from "next/headers";
import AttendanceSystemSkeleton from "./attendance-system-skeleton";

const AttendanceSystem = dynamic(
  () => import("@/components/pages/home/attendance-system")
);

const HomeIndex = async () => {
  const cookieStore = cookies();
  const employeeId = cookieStore.get("employeeId")?.value;

  if (!employeeId) {
    return <div>Employee not found, Please login again</div>;
  }

  const attendanceData = await API.getSingleEmployeeData(employeeId as string);

  return (
    <div>
      {attendanceData ? (
        <AttendanceSystem
          employeeAttendance={attendanceData as GetCurrentEmployeeResponse}
        />
      ) : (
        <AttendanceSystemSkeleton />
      )}
    </div>
  );
};

export default HomeIndex;
