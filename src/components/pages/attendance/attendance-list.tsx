import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import helpers from "@/utils/helpers";
import { EmployeeAttendanceList } from "@/utils/APIType";

type Props = {
  attendanceData: EmployeeAttendanceList;
};

export default function AttendanceList({ attendanceData }: Props) {
  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-lg font-bold mb-5">
          {attendanceData.employee.email} ({attendanceData.employee.id})
        </h1>
      </div>

      <Table>
        <TableCaption>A list of your recent attendance records.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>DATE</TableHead>
            <TableHead>CHECK IN</TableHead>
            <TableHead>CHECK OUT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {helpers.formateDate(new Date(record.date))}
              </TableCell>
              <TableCell>
                {record.clockIn
                  ? helpers.formatTime(new Date(record.clockIn))
                  : "N/A"}
              </TableCell>
              <TableCell>
                {record.clockOut
                  ? helpers.formatTime(new Date(record.clockOut))
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
