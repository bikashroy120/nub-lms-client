import Link from 'next/link';
import {
    User,
    LayoutDashboard,
    BookOpen,
    LogOut,
    Settings,
    ShieldCheck
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/context/auth-context';

const UserButtonHome = () => {
    const { user, logout } = useAuth();

    const dashboardHref = user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';

    return (
        <div className='flex items-center gap-4'>
            {user ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='relative h-9 w-9 rounded-full border border-border shadow-sm'>
                            <Avatar className='h-8 w-8'>
                                {/* <AvatarImage src={user?.image} alt={user?.name} /> */}
                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                                    {user?.name?.split(' ')[0][0]}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end' className='w-56 p-1 bg-white'>
                        {/* ইউজার প্রোফাইল প্রিভিউ */}
                        <DropdownMenuLabel className='font-normal'>
                            <div className='flex flex-col space-y-1 p-2'>
                                <p className='text-sm font-semibold leading-none flex items-center gap-2'>
                                    {user.name}
                                    {user.role === 'admin' && <ShieldCheck className="h-3 w-3 text-primary" />}
                                </p>
                                <p className='text-xs leading-none text-muted-foreground truncate'>
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {/* মেনু আইটেমস */}
                        <div className="p-1">
                            <Link href={dashboardHref}>
                                <DropdownMenuItem className='cursor-pointer gap-2 py-2'>
                                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>
                            </Link>

                            {user.role !== 'admin' && (
                                <Link href={dashboardHref}>
                                    <DropdownMenuItem className='cursor-pointer gap-2 py-2'>
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span>My Courses</span>
                                    </DropdownMenuItem>
                                </Link>
                            )}

                            {/* <Link href="/profile/settings">
                                <DropdownMenuItem className='cursor-pointer gap-2 py-2'>
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </Link> */}
                        </div>

                        <DropdownMenuSeparator />

                        {/* লগআউট */}
                        <div className="p-1">
                            <DropdownMenuItem
                                onClick={() => logout()}
                                className='cursor-pointer gap-2 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive'
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href='/login'>
                    <Button variant='default' size='sm' className="rounded-full px-5 shadow-md">
                        <User className='mr-2 h-4 w-4' /> Login
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default UserButtonHome