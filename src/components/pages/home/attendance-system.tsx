"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader, LogIn, LogOut } from "lucide-react";
import axios from "axios";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import helpers from "@/utils/helpers";
import { GetCurrentEmployeeResponse } from "@/utils/APIType";

type Props = {
  employeeAttendance: GetCurrentEmployeeResponse;
};

export default function AttendanceSystem({ employeeAttendance }: Props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const [isClockOutDisabled, setIsClockOutDisabled] = useState(false);

  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [actionType, setActionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Handle initial state setup based on employeeAttendance
  useEffect(() => {
    const isClockIn = !!employeeAttendance?.data?.clockIn;
    const isClockOut = !!employeeAttendance?.data?.clockOut;

    setClockInTime(
      isClockIn
        ? helpers.formatTime(new Date(employeeAttendance.data.clockIn))
        : ""
    );
    setClockOutTime(
      isClockOut
        ? helpers.formatTime(new Date(employeeAttendance.data.clockOut))
        : ""
    );

    setIsClockInDisabled(isClockIn);
    setIsClockOutDisabled(isClockOut);
    setButtonDisabled(isClockIn && isClockOut);
  }, [employeeAttendance]);

  const handleOpenModal = (type: string) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescription("");
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      const bodyData = {
        employeeId: employeeAttendance?.employee?.id ?? "",
        description,
      };

      const { data } =
        actionType === "in"
          ? await axios.post("/api/v1/attendance", bodyData)
          : await axios.patch("/api/v1/attendance", {
              id: employeeAttendance?.data?.id ?? "",
              description,
            });

      if (data) {
        if (actionType === "in") {
          setClockInTime(helpers.formatTime(new Date(data?.data?.clockIn)));
          setIsClockInDisabled(true);
        } else {
          setClockOutTime(helpers.formatTime(new Date(data?.data?.clockOut)));
          setIsClockOutDisabled(true);
          setButtonDisabled(true);
        }
      }
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error calling API");
    } finally {
      setIsLoading(false);
    }

    handleCloseModal();
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {employeeAttendance?.employee?.name.toLocaleUpperCase()}
        </h1>

        <div className="flex gap-4">
          <Button
            onClick={() => handleOpenModal("in")}
            disabled={isClockInDisabled || buttonDisabled}
            className="flex-1 cursor-pointer"
            size="lg"
            variant="default"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Check In
          </Button>

          <Button
            onClick={() => handleOpenModal("out")}
            disabled={
              isClockOutDisabled || buttonDisabled || !isClockInDisabled
            }
            className="flex-1 cursor-pointer"
            size="lg"
            variant="destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Check Out
          </Button>
        </div>

        <div className="mt-6 space-y-2 text-center text-sm">
          {clockInTime && (
            <p>
              <span className="font-medium">Check In:</span> {clockInTime}
            </p>
          )}
          {clockOutTime && (
            <p>
              <span className="font-medium">Check Out:</span> {clockOutTime}
            </p>
          )}
          {isClockInDisabled && !isClockOutDisabled ? (
            <p className="text-green-500 font-medium">
              You are currently checked in
            </p>
          ) : (
            clockOutTime && (
              <p className="text-amber-500 font-medium">
                You are currently checked out
              </p>
            )
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "in" ? "Check In" : "Check Out"} Confirmation
            </DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter description (optional)"
            value={description}
            aria-describedby="description"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseModal}>
              No
            </Button>
            <Button onClick={handleConfirm}>
              {isLoading ? <Loader /> : "Yes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
