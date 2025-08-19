"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { completedCourses, pendingCourses } from "@/lib/data";
import { BookOpen, ListChecks } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <>
    <div className="grid gap-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Navigation options */}
        <div className="flex justify-center gap-4 mb-6">
          {/* Dashboard Link */}
          <Link href="/dashboard">
            <div className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-200 hover:shadow-md cursor-pointer ${
              pathname === '/dashboard' || pathname === '/'
                ? 'bg-[#8981df] text-white' // Active state classes
                : 'text-gray-700'
            }
            `}>
              <ListChecks className="h-5 w-5" /> {/* Placeholder icon, replace with actual icon if needed */}
              <span className="text-sm font-medium">Dashboard</span>
            </div>
          </Link>
          {/* Optimal Path Link */}
          <Link href="/optimal-path">
            <div className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-200 hover:shadow-md cursor-pointer ${
              pathname === '/optimal-path'
                ? 'bg-[#8981df] text-white' // Active state classes
                : 'text-gray-700'
            }
            `}>
              <BookOpen className="h-5 w-5" /> {/* Placeholder icon */}
              <span className="text-sm font-medium">Optimal Path</span>
            </div>
          </Link>
          {/* Electives Link */}
          <Link href="/electives">
            <div className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-200 hover:shadow-md cursor-pointer ${
              pathname === '/electives'
                ? 'bg-[#8981df] text-white' // Active state classes
                : 'text-gray-700'
            }
            `}>
              <BookOpen className="h-5 w-5" /> {/* Placeholder icon */}
              <span className="text-sm font-medium">Electives</span>
            </div>
          </Link>
          {/* Prediction Link */}
          <Link href="/prediction">
            <div className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-200 hover:shadow-md cursor-pointer ${
              pathname === '/prediction'
                ? 'bg-[#8981df] text-white' // Active state classes
                : 'text-gray-700'
            }
            `}>
              <BookOpen className="h-5 w-5" /> {/* Placeholder icon */}
              <span className="text-sm font-medium">Prediction</span>
            </div>
          </Link>
        </div>
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-semibold">Completed Courses</CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Courses you have successfully passed.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader className="text-sm text-muted-foreground">
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
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
                      <Badge variant="default">{course.grade}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-semibold">Pending Courses</CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Required courses for your degree.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Prerequisites</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingCourses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell className="font-medium">
                      <div>{course.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{course.code}</div>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.prerequisites.join(', ') || 'None'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
