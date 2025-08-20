import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";

export default function UserInfoCard() {
  const progressValue = (user.completedCredits / user.totalCredits) * 100;

  console.log("Progress Value:", progressValue);

  return (
    <Card className="border border-secondary text-black">
      <CardHeader className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 p-6">
        <div className="flex items-center gap-4 md:col-span-1">
            <Avatar className="h-24 w-24 text-primary text-2xl font-bold">
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold text-black">{user.name}</CardTitle>
              <CardDescription className="text-sm text-black">{user.email}</CardDescription>
            </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
            <div className="flex flex-col items-center md:items-start">
 <p className="text-xs text-black/70">Major</p>
 <Badge className="text-sm bg-primary text-white font-normal">{user.major}</Badge>
 </div>
 <div className="flex flex-col items-center md:items-start">
                <p className="text-xs text-black/70">Current Term</p>
                <Badge className="text-sm bg-primary text-white font-normal">{user.currentTerm}</Badge>
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
                <p className="text-xs font-medium text-black/70">Degree Progress</p>
                <p className="text-xs font-bold text-black">{user.completedCredits} / {user.totalCredits} credits</p>
            </div>
            <Progress value={progressValue} aria-label={`${progressValue.toFixed(0)}% complete`} className="[&>*]:bg-accent" />
          </div>
      </CardContent>
    </Card>
  );
}
