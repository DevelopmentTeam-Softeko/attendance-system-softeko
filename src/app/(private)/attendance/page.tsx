import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const AttendanceIndex = dynamic(() => import("@/components/pages/attendance"), {
  ssr: false,
});
import React from "react";

const attendancePage = () => {
  const cookieStore = cookies();
  const employeeId = cookieStore.get("employeeId")?.value;

  return (
    <div>
      <AttendanceIndex id={employeeId} />
    </div>
  );
};

export default attendancePage;
