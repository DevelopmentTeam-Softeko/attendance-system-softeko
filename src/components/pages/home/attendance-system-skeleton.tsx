import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton loading component
const AttendanceSystemSkeleton = () => (
  <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background p-4">
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="space-y-2 mt-6">
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Skeleton className="h-36 w-full rounded-lg" />
          <Skeleton className="h-36 w-full rounded-lg" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg mt-4" />
      </div>
    </div>
  </div>
);

export default AttendanceSystemSkeleton;
