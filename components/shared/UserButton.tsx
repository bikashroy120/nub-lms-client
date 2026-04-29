'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/lib/context/auth-context';
import { LayoutDashboard, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

const UserButton = () => {
  const { user, logout } = useAuth();

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 cursor-pointer rounded-full border border-border shadow-sm hover:bg-accent transition-all'>
          <Avatar className='h-9 w-9'>
            {/* <AvatarImage src={user?.image} alt={user?.name || "User"} /> */}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-64 p-1 shadow-lg bg-white border-muted' sideOffset={10}>
        {/* User Info Section */}
        <DropdownMenuLabel className='font-normal p-3'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-semibold leading-none'>{user?.name || "Guest User"}</p>
            <p className='text-xs leading-none text-muted-foreground truncate'>
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Action Groups */}
        <DropdownMenuGroup className="p-1">
          <Link href={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}>
            <DropdownMenuItem className='cursor-pointer rounded-md px-3 py-2 text-sm flex items-center gap-2'>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/profile">
            <DropdownMenuItem className='cursor-pointer rounded-md px-3 py-2 text-sm flex items-center gap-2'>
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout Section */}
        <div className="p-1">
          <DropdownMenuItem
            onClick={() => logout?.()}
            className='cursor-pointer rounded-md px-3 py-2 text-sm flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive'
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;