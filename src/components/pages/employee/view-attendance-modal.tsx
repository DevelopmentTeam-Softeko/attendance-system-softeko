"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";

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
import { GetEmployees } from "@/utils/APIType";

type Props = {
  record: GetEmployees;
};

const AttendanceVideModal = ({ record }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="flex-1 cursor-pointer"
        size="icon"
        variant="link"
      >
        See Attendance
      </Button>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-3/4">
            <Table>
              <TableCaption>
                A list of <span className="font-bold">{record.name} </span>{" "}
                recent attendance records.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>DATE</TableHead>
                  <TableHead>CHECK IN</TableHead>
                  <TableHead>CHECK OUT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {record.attendance.map((record) => (
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AttendanceVideModal;
