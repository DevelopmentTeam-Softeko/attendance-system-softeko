/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { GetCurrentEmployeeResponse, GetEmployees } from "./APIType";

const getEmployees = async () => {
  try {
    const employees = (await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        attendance: {
          select: {
            id: true,
            date: true,
            clockIn: true,
            clockOut: true,
          },
        },
      },
    })) as GetEmployees[];

    return employees;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSingleEmployeeData = async (
  employeeId: string
): Promise<GetCurrentEmployeeResponse | null> => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const employeeExist: any = await prisma.employee.findUnique({
      where: { id: Number(employeeId) },
    });

    const todayAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: Number(employeeId),
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    const responseData = {
      data: todayAttendance
        ? {
            ...todayAttendance,
            date: todayAttendance.date.toISOString(),
            clockIn: todayAttendance.clockIn.toISOString(),
            clockOut: todayAttendance.clockOut?.toISOString() || "",
          }
        : null,
      status: true,
      employee: {
        id: employeeExist.id,
        name: employeeExist.name,
        email: employeeExist.email,
      },
    };

    return responseData as GetCurrentEmployeeResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const API = {
  getEmployees,
  getSingleEmployeeData,
};

export default API;
