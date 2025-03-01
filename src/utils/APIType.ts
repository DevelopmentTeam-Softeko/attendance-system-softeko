export type GetCurrentEmployeeResponse = {
  data: {
    id: string;
    date: string;
    clockIn: string;
    clockOut: string;
    clockInDesc: string | null;
    clockOutDesc: string | null;
    employeeId: number;
  };
  status: boolean;
  employee: {
    id: number;
    name: string;
    email: string;
  };
};

export type GetEmployees = {
  id: number;
  name: string;
  email: string;
  role: string;
  attendance: {
    id: string;
    date: Date;
    clockIn: Date;
    clockOut: Date;
  }[];
};

export type EmployeeAttendanceList = {
  data: {
    id: string;
    date: string;
    clockIn: string;
    clockOut: string;
    clockInDesc: string | null;
    clockOutDesc: string | null;
    employeeId: number;
  }[];
  status: boolean;
  employee: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export type AttendanceListType = {
  data: {
    id: string;
    date: Date;
    clockIn: Date;
    clockOut: Date;
    clockInDesc: string | null;
    clockOutDesc: string | null;
    employeeId: number;
    employee: {
      id: number;
      name: string;
      email: string;
    };
  }[];
};
