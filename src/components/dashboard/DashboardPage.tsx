import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { user, completedCourses, pendingCourses } from "@/lib/data";

export default function DashboardPage() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;
  
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Completed Courses</CardTitle>
            <CardDescription>Courses you have successfully passed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
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
        <Card>
          <CardHeader>
            <CardTitle>Pending Courses</CardTitle>
            <CardDescription>Required courses for your degree.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
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
                    <TableCell>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">{course.code}</div>
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
  )
}
