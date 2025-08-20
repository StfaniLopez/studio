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
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b px-4 md:px-6 z-50 bg-white text-black">
      <GraduationCap className="h-10 w-10 text-primary" /> {/* Adjusted icon color */}
      <h1 className="text-2xl font-semibold md:text-3xl font-headline text-primary">
        <span className="text-black">GradPath - </span>
        <span className="text-primary">LEAD University</span>
 </h1>

 {/* User Dropdown - Aligned to the right */}
 <div className="ml-auto flex items-center gap-4">
 {/* <div className="hidden sm:flex"></div> */} {/* Removed unnecessary div */}
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button variant="secondary" size="icon" className="rounded-full">
 <Avatar className="h-10 w-10">
 <AvatarFallback className="text-primary">{userInitials}</AvatarFallback>
 </Avatar>
 <span className="sr-only">Toggle user menu</span>
 </Button>
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end">
 <DropdownMenuLabel>My Account</DropdownMenuLabel>
 <DropdownMenuSeparator />
 <DropdownMenuItem className="text-black hover:bg-accent cursor-pointer"> {/* Added hover style and cursor */}
 <User className="mr-2 h-4 w-4" /> {/* Adjusted icon color */}
 <span>Profile</span>
 </DropdownMenuItem>
 <DropdownMenuItem className="text-black hover:bg-accent cursor-pointer"> {/* Added hover style and cursor */}
 <Settings className="mr-2 h-4 w-4 text-gray-600" /> {/* Adjusted icon color */}
 <span>Settings</span>
 </DropdownMenuItem>
 <DropdownMenuSeparator className="bg-gray-200" /> {/* Adjusted separator color */}
 <DropdownMenuItem>
 <LogOut className="mr-2 h-4 w-4" />
 <span>Logout</span>
 </DropdownMenuItem>
 </DropdownMenuContent>
 </DropdownMenu>
 </div>
 </header>
  );
}