import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";

export default function UserInfoCard() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;

  return (
    <Card>
      <CardHeader className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="flex items-center gap-4 md:col-span-1">
            <Avatar className="h-20 w-20">
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-base text-card-foreground/80">{user.email}</CardDescription>
            </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-muted-foreground">Major</p>
                <Badge variant="secondary" className="text-base">{user.major}</Badge>
            </div>
             <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-muted-foreground">Current Term</p>
                <Badge variant="secondary" className="text-base">{user.currentTerm}</Badge>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-muted-foreground">Overall GPA</p>
                <p className="text-lg font-bold">{user.gpa.toFixed(2)}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-muted-foreground">Degree Progress</p>
                <p className="text-sm font-bold">{user.completedCredits} / {user.totalCredits} credits</p>
            </div>
            <Progress value={progressValue} aria-label={`${progressValue.toFixed(0)}% complete`} />
          </div>
      </CardContent>
    </Card>
  );
}
