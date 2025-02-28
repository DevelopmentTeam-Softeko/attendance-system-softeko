import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendanceListType } from "@/utils/APIType";
import helpers from "@/utils/helpers";
import Link from "next/link";
import React from "react";

type Props = {
  loading: boolean;
  attendanceListData: AttendanceListType | undefined;
};

const TableBodySection = ({ attendanceListData, loading }: Props) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>
          {loading
            ? "Loading attendance records..."
            : attendanceListData?.data.length
            ? `Showing ${attendanceListData.data.length} attendance records`
            : "No attendance records found for the selected period"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead className="text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            // Loading skeleton rows
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array(7)
                    .fill(0)
                    .map((_, cellIndex) => (
                      <TableCell key={`cell-${index}-${cellIndex}`}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : attendanceListData?.data.length ? (
            attendanceListData.data.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employee.id}</TableCell>
                <TableCell className="font-medium">
                  {record.employee.name.toLocaleUpperCase()}
                </TableCell>
                <TableCell>{record.employee.email}</TableCell>
                <TableCell>
                  {helpers.formateDate(new Date(record.date))}
                </TableCell>
                <TableCell>
                  {record.clockIn
                    ? helpers.formatTime(new Date(record.clockIn))
                    : "—"}
                </TableCell>
                <TableCell>
                  {record.clockOut
                    ? helpers.formatTime(new Date(record.clockOut))
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/attendance/${record.employee.id}`}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Attendance Details
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-gray-500"
              >
                No attendance records found for this period
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableBodySection;
