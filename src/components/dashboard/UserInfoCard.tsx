import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";

export default function UserInfoCard() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;

  return (
    <Card>
      <CardHeader className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-6 p-6">
        <Avatar className="h-24 w-24 text-3xl font-bold">
          <AvatarFallback className="bg-secondary text-secondary-foreground">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="grid gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{user.email}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Major: {user.major}</Badge>
                <Badge variant="outline">Term: {user.currentTerm}</Badge>
                <Badge variant="outline">GPA: {user.gpa.toFixed(2)}</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <p className="font-medium text-muted-foreground">Degree Progress</p>
                <p className="font-semibold">{user.completedCredits} / {user.totalCredits} credits</p>
            </div>
            <Progress value={progressValue} aria-label={`${progressValue.toFixed(0)}% complete`} />
          </div>
      </CardContent>
    </Card>
  );
}
