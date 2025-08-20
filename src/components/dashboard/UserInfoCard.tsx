import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";
import { Badge } from "../ui/badge";

export default function UserInfoCard() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;

  return (
    <Card>
      <CardHeader className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-6 p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 text-3xl font-bold">
            <AvatarFallback className="bg-secondary text-secondary-foreground">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{user.email}</CardDescription>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg text-center">
              <p className="text-base font-bold text-primary mb-1">Major</p>
              <Badge variant="secondary" className="text-sm py-1 px-3 whitespace-nowrap">{user.major}</Badge>
            </div>
            <div className="p-4 rounded-lg text-center">
              <p className="text-base font-bold text-primary mb-1">Term</p>
              <Badge variant="secondary" className="text-sm py-1 px-3">{user.currentTerm}</Badge>
            </div>
            <div className="p-4 rounded-lg text-center">
              <p className="text-base font-bold text-primary mb-1">GPA</p>
              <Badge variant="secondary" className="text-sm py-1 px-3">{user.gpa.toFixed(2)}</Badge>
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
