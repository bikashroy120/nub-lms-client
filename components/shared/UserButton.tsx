'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/lib/context/auth-context';

const UserButton = () => {
  const { user } = useAuth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size={'icon'} className=' rounded-full'>
            <Avatar>
              <AvatarFallback>Bi</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className=' min-w-50'>
          <div className=' p-3'>
            <h2 className=' text-sm font-semibold'>Name</h2>
            <span className=' text-sm font-medium'>Name</span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className=' px-2'>
            <DropdownMenuItem className=' px-3 py-2'>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem className=' px-3 py-2'>Profile</DropdownMenuItem>
            <DropdownMenuItem className=' px-3 py-2 bg-red-100 text-red-500'>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
