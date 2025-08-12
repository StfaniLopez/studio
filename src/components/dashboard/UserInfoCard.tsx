import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { user } from "@/lib/data";

export default function UserInfoCard() {
  return (
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
  );
}
