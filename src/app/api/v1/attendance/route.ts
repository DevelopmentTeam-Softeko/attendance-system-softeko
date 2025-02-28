import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Post = {
  clockInDesc?: string;
  employeeId: number;
};

type Put = {
  id: string;
  clockOutDesc?: string;
};

export const GET = async () => {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        employee: true,
      },
    });

    return NextResponse.json({
      data: attendance,
      status: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      message: "Error fetching attendance records.",
      error: error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const { clockInDesc, employeeId } = (await req.json()) as Post;

  if (!employeeId) {
    return NextResponse.json({
      message: "Employee ID is required.",
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

    // Get the start and end of the current day
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Check if there is already an attendance record for today
    const todayAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: employeeId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (todayAttendance) {
      return NextResponse.json({
        message: "Already checked in today.",
        status: false,
        employee: {
          id: employeeExist.id,
          name: employeeExist.name,
          email: employeeExist.email,
        },
      });
    }

    // Create a new attendance record
    const createAttendance = await prisma.attendance.create({
      data: {
        clockInDesc,
        employeeId: employeeId,
      },
    });

    return NextResponse.json({
      message: "Checked-in successful!",
      status: true,
      data: createAttendance,
      employee: {
        name: employeeExist.name,
        email: employeeExist.email,
      },
      info: {
        clockOut: `PUT /api/v1/attendance`,
        clockOutBody: `{id: ${createAttendance.id}, clockOutDesc: if any}`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      message: "Error Check in.",
      status: false,
      error: error,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  const { id, clockOutDesc } = (await req.json()) as Put;

  if (!id) {
    return NextResponse.json({
      message: "Attendance ID is required.",
      status: false,
    });
  }

  try {
    // Check if the attendance record exists
    const attendanceRecord = await prisma.attendance.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });

    if (!attendanceRecord) {
      return NextResponse.json({
        message: "Attendance record does not exist.",
        status: false,
      });
    }

    // Check if clockOut is already updated
    if (attendanceRecord.clockOut) {
      return NextResponse.json({
        message: "Already Checkout out.",
        status: false,
        employee: {
          name: attendanceRecord.employee.name,
          email: attendanceRecord.employee.email,
        },
      });
    }

    const updateAttendance = await prisma.attendance.update({
      where: {
        id,
      },
      data: {
        clockOutDesc,
        clockOut: new Date(),
      },
    });

    return NextResponse.json({
      message: "Checked-out successful!",
      status: true,
      data: updateAttendance,
      employee: {
        name: attendanceRecord.employee.name,
        email: attendanceRecord.employee.email,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error check out.",
      status: false,
      error: error,
    });
  }
};
