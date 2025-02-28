import React from "react";
import EmployeeList from "./employee-list";
import API from "@/utils/API";
import { GetEmployees } from "@/utils/APIType";

export const revalidate = 36000;

const EmployeeIndex = async () => {
  const employees = await API.getEmployees();

  return (
    <div>
      <EmployeeList data={employees as GetEmployees[]} />
    </div>
  );
};

export default EmployeeIndex;
