import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GetEmployees } from "@/utils/APIType";
import AttendanceVideModal from "./view-attendance-modal";

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
                <AttendanceVideModal record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
