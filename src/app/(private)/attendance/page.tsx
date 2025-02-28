import dynamic from "next/dynamic";

const AttendanceIndex = dynamic(() => import("@/components/pages/attendance"), {
  ssr: false,
});
import React from "react";

const attendancePage = () => {
  return (
    <div>
      <AttendanceIndex />
    </div>
  );
};

export default attendancePage;
