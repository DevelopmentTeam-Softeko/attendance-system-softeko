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
    // Check if the employee exists
    const employeeExit = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExit) {
      return NextResponse.json({
        message: "Employee does not exist.",
        status: false,
      });
    }

    const attendance = await prisma.attendance.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      data: attendance,
      status: true,
      employee: {
        id: employeeExit.id,
        name: employeeExit.name,
        email: employeeExit.email,
        role: employeeExit.role,
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
