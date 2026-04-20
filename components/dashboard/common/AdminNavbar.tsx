'use client';

import React from 'react';
import { Search, Bell, Command, Sun, Moon } from 'lucide-react';
import UserButton from '@/components/shared/UserButton';
import { Button } from '@/components/ui/button'; // shadcn/ui button (optional)
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // shadcn/ui tooltip (optional)

const AdminNavbar = () => {
  return (
    <nav className='sticky top-0 z-30 w-full flex items-center h-16 justify-between px-6 border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      
      {/* --- Left Side: Search Bar --- */}
      <div className='relative flex items-center group'>
        <div className='absolute left-3 text-gray-400 group-focus-within:text-indigo-600 transition-colors'>
          <Search size={18} />
        </div>
        <input
          type='text'
          placeholder='Quick search...'
          className='w-64 md:w-80 border border-gray-200 py-2 pl-10 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50/50 focus:bg-white'
        />
        <div className='absolute right-3 hidden md:flex items-center gap-1 px-1.5 py-0.5 border border-gray-200 rounded bg-white text-[10px] text-gray-400 font-mono pointer-events-none'>
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* --- Right Side: Actions & Profile --- */}
      <div className='flex items-center gap-2 md:gap-4'>
        
        {/* Dark Mode Toggle (Optional Placeholder) */}
        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
            <Sun size={20} className="scale-100 dark:scale-0 transition-all" />
        </Button>

        {/* Notifications */}
        <div className='relative'>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className='absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full'></span>
          </Button>
        </div>

        {/* Separator */}
        <div className='h-6 w-px bg-gray-200 mx-1 hidden md:block'></div>

        {/* User Info & Profile */}
        <div className='flex items-center gap-3 pl-2'>
          <div className='hidden md:flex flex-col items-end'>
            <span className='text-sm font-bold text-gray-800 leading-none'>Bikash Chandra</span>
            <span className='text-[10px] text-emerald-600 font-bold uppercase tracking-wider'>Online</span>
          </div>
          <div className='p-0.5 rounded-full border-2 border-indigo-100 hover:border-indigo-500 transition-colors cursor-pointer'>
            <UserButton />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default AdminNavbar;