"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { completedCourses, pendingCourses } from "@/lib/data";
import { BookOpen, ListChecks } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <div className="grid gap-6 text-black bg-white container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Completed Courses */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-semibold text-black">Completed Courses</CardTitle>
            </div>
            <CardDescription className="text-sm text-black mt-1">
              Courses you have successfully passed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Course</TableHead>
                  <TableHead className="text-black">Credits</TableHead>
                  <TableHead className="text-black text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedCourses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell>
                      <div className="font-medium text-black">{course.name}</div>
                      <div className="text-sm text-black">{course.code}</div>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className={
                          course.grade === "A"
                            ? "bg-accent text-white"
                            : "bg-secondary text-black"
                        }>
                        {course.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Courses */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-semibold text-black">Pending Courses</CardTitle>
            </div>
            <CardDescription className="text-sm text-black mt-1">
              Required courses for your degree.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Course</TableHead>
                  <TableHead className="text-black">Credits</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCourses.map((course) => {
                  const isInProgress = course.code === "TTCT0022"; // Visualización de datos
                  return (
                    <TableRow key={course.code}>
                      <TableCell>
                        <div className="font-medium text-black">{course.name}</div>
                        <div className="text-sm text-black">{course.code}</div>
                      </TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        {isInProgress ? (
                          <Badge variant="default" className="bg-accent text-white">
                            In Progress
                          </Badge>
                        ) : (
                          <Badge variant="default" className="bg-secondary text-black">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}