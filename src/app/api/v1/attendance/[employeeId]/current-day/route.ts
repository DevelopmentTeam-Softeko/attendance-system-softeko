import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { employeeId: string } }
) {
  const employeeId = Number(params.employeeId);

  if (isNaN(employeeId)) {
    return NextResponse.json({
      message: "Invalid employee ID.",
      status: false,
    });
  }

  try {
    const employeeExist = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExist) {
      return NextResponse.json({
        message: "Employee does not exist.",
        status: false,
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query to find today's attendance for the given employee
    const todayAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    return NextResponse.json({
      data: todayAttendance,
      status: true,
      employee: {
        id: employeeExist.id,
        name: employeeExist.name,
        email: employeeExist.email,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error retrieving employee.",
      status: false,
      error: error,
    });
  }
}
