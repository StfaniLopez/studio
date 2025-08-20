import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
        <div className="grid gap-1">
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="font-bold text-lg text-primary">Major</p>
              <p className="text-muted-foreground">{user.major}</p>
            </div>
            <div>
              <p className="font-bold text-lg text-primary">Term</p>
              <p className="text-muted-foreground">{user.currentTerm}</p>
            </div>
            <div>
              <p className="font-bold text-lg text-primary">GPA</p>
              <p className="text-muted-foreground">{user.gpa.toFixed(2)}</p>
            </div>
          </div>
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
