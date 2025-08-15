import { GraduationCap, User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { user } from '@/lib/data';

export default function Header() {
  const userInitials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b px-4 md:px-6 z-50" style={{ backgroundColor: '#e8e4ff' }}>
      <GraduationCap className="h-10 w-10 text-primary" />
      <h1 className="text-2xl font-semibold md:text-3xl font-headline" style={{ color: '#2b2a2a' }}>
        GradPath-AI Planner
      </h1>

      {/* User Dropdown - Aligned to the right */}
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden sm:flex"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}