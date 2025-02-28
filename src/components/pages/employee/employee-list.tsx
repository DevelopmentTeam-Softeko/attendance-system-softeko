import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { GetEmployees } from "@/utils/APIType";

type Props = {
  data: GetEmployees[];
};

export default function EmployeeList({ data }: Props) {
  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-lg font-bold mb-5">Employee List</h1>
      </div>

      <Table>
        <TableCaption>A list of out employees .</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> ID </TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.name.toLocaleUpperCase()}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.role}</TableCell>
              <TableCell>
                <Link
                  href={`/attendance/${record.id}`}
                  target="_blank"
                  className="text-blue-500"
                >
                  View Attendance
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
