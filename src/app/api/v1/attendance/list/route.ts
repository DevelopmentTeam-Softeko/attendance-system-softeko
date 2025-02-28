/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    // Initialize the whereClause
    let whereClause: Record<string, any> = {};

    if (from && to) {
      // Create dates with time set to start and end of day
      const fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);

      const toDate = new Date(to);
      toDate.setUTCHours(23, 59, 59, 999);

      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return NextResponse.json({
          message: "Invalid 'from' or 'to' date format.",
          status: false,
        });
      }

      whereClause = {
        date: {
          gte: fromDate,
          lte: toDate,
        },
      };
    } else if (from) {
      const fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(from);
      endOfDay.setUTCHours(23, 59, 59, 999);

      if (isNaN(fromDate.getTime())) {
        return NextResponse.json({
          message: "Invalid 'from' date format.",
          status: false,
        });
      }

      whereClause = {
        date: {
          gte: fromDate,
          lte: endOfDay, // Ensure we get the full day for "today" option
        },
      };
    } else if (!from && !to) {
      const startOfDay = new Date();
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setUTCHours(23, 59, 59, 999);

      whereClause = {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      };
    }

    // Query to find attendance for the given date range or today's attendance
    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc", // Most recent first
      },
    });

    return NextResponse.json({
      data: attendance,
      status: true,
    });
  } catch (error) {
    console.error("Error retrieving attendance:", error);
    return NextResponse.json({
      message: "Error retrieving attendance.",
      status: false,
      error: error,
    });
  }
}
