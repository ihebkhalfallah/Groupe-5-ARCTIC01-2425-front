import { StudentList } from "@/components/student-list";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Foyer Management System
      </h1>
      <Suspense fallback={<StudentListSkeleton />}>
        <StudentList />
      </Suspense>
    </div>
  );
}

function StudentListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-5 space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
      ))}
    </div>
  );
}
