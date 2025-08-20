"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { completedCourses, pendingCourses } from "@/lib/data";
import { BookOpen, ListChecks } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Completed Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-primary" />
              <CardTitle>Completed Courses</CardTitle>
            </div>
            <CardDescription>Courses you have successfully passed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-primary text-base">Course</TableHead>
                  <TableHead className="font-bold text-primary text-base">Credits</TableHead>
                  <TableHead className="text-right font-bold text-primary text-base">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedCourses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">{course.code}</div>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className={
                          course.grade === "A"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
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
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>Pending Courses</CardTitle>
            </div>
            <CardDescription>Required courses for your degree.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-primary text-base">Course</TableHead>
                  <TableHead className="font-bold text-primary text-base">Credits</TableHead>
                  <TableHead className="font-bold text-primary text-base">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCourses.map((course) => {
                  const isInProgress = course.code === "TTCT0022";
                  return (
                    <TableRow key={course.code}>
                      <TableCell>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-muted-foreground">{course.code}</div>
                      </TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        {isInProgress ? (
                           <Badge variant="default" className="bg-green-500 text-white hover:bg-green-600">
                            In Progress
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80">
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
