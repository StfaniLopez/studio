import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user, completedCourses, pendingCourses } from "@/lib/data";

export default function DashboardPage() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;
  
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="text-base text-card-foreground/80">{user.email}</CardDescription>
            <div className="mt-2 flex items-center gap-4">
              <Badge variant="secondary">Major: {user.major}</Badge>
              <Badge variant="secondary">Term: {user.currentTerm}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <span className="text-2xl">🎓</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.gpa.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Based on all completed courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Credits</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.completedCredits}</div>
            <p className="text-xs text-muted-foreground">Out of {user.totalCredits} required</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Degree Progress</CardTitle>
           </CardHeader>
           <CardContent>
              <Progress value={progressValue} aria-label={`${progressValue.toFixed(0)}% complete`} />
             <p className="text-sm text-muted-foreground mt-2">{progressValue.toFixed(2)}% of your degree completed.</p>
           </CardContent>
        </Card>
      </div>
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
                        <div className="font-medium">{course.code}</div>
                        <div className="text-sm text-muted-foreground">{course.name}</div>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="default" className="bg-green-500">{course.grade}</Badge>
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
                      <div className="font-medium">{course.code}</div>
                      <div className="text-sm text-muted-foreground">{course.name}</div>
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
