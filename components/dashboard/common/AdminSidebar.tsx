'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  GraduationCap,
  LogOut,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const [open, setOpen] = useState<number | null>(null);
  const pathname = usePathname();

  const menus = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard/admin',
      color: 'text-blue-500',
    },
    {
      name: 'Users',
      icon: Users,
      color: 'text-purple-500',
      children: [
        { name: 'All Users', path: '/dashboard/admin/user' },
        { name: 'Add Users', path: '/dashboard/admin/user/add' },
      ],
    },
    {
      name: 'Courses',
      icon: GraduationCap,
      color: 'text-rose-500',
      children: [
        { name: 'Category', path: '/dashboard/admin/course/category' },
        { name: 'All Courses', path: '/dashboard/admin/course' },
        { name: 'Add Course', path: '/dashboard/admin/course/add' },
      ],
    },
  ];

  // Animation Variants for Smooth Transition
  const menuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.1 } }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { height: { duration: 0.3 }, opacity: { duration: 0.1 } }
    }
  };

  return (
    <div className='w-72 h-screen flex flex-col p-4 bg-white border-r border-gray-100 shadow-2xl shadow-gray-100/50'>

      {/* --- Logo Section --- */}
      <div className='flex items-center gap-3 px-3 py-6 mb-4 border-b'>
        <motion.div
          whileHover={{ rotate: 15 }}
          className='p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100'
        >
          <Sparkles className='text-white' size={24} />
        </motion.div>
        <h2 className='text-xl font-black text-gray-800 tracking-tight'>
          LEARN<span className='text-indigo-600'>HUB</span>
        </h2>
      </div>

      {/* --- Navigation Menus --- */}
      <nav className='flex-1 space-y-1 overflow-y-auto custom-scrollbar px-1'>
        {menus.map((menu, index) => {
          const Icon = menu.icon;
          const isParentActive = menu.children?.some(child => pathname === child.path) || pathname === menu.path;
          const isOpen = open === index;

          return (
            <div key={index} className='mb-1'>
              {menu.children ? (
                <>
                  <button
                    onClick={() => setOpen(isOpen ? null : index)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 relative group ${isParentActive ? 'bg-indigo-100' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className='flex items-center gap-3 z-10'>
                      <div className={`p-2 rounded-lg transition-all duration-500 ${isParentActive ? 'bg-white shadow-sm scale-110' : 'bg-gray-100 group-hover:bg-white'
                        }`}>
                        <Icon size={18} className={`${menu.color}`} />
                      </div>
                      <span className={`text-sm font-semibold transition-colors duration-300 ${isParentActive ? 'text-indigo-700' : 'text-gray-600'
                        }`}>
                        {menu.name}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown size={16} className={isParentActive ? 'text-indigo-600' : 'text-gray-400'} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className='ml-7 mt-1 space-y-1 border-l-2 border-indigo-50 overflow-hidden'
                      >
                        {menu.children.map((child, i) => {
                          const isActive = pathname === child.path;
                          return (
                            <Link
                              key={i}
                              href={child.path}
                              className={`block py-2.5 px-6 text-sm rounded-r-lg transition-all relative ${isActive
                                ? 'text-indigo-600 font-bold bg-indigo-50/30'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'
                                }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-highlight"
                                  className="absolute left-[-2px] top-2 bottom-2 w-[3px] bg-indigo-100 rounded-full"
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                              {child.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={menu.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative group ${pathname === menu.path
                    ? 'text-indigo-600 shadow-indigo-100'
                    : 'hover:bg-gray-50 text-gray-600'
                    }`}
                >
                  {pathname === menu.path && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-indigo-100 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className='relative z-10 flex items-center gap-3'>
                    <div className={`p-2 rounded-lg transition-all duration-500 ${isParentActive ? 'bg-white shadow-sm scale-110' : 'bg-gray-100 group-hover:bg-white'
                      }`}>
                      <Icon size={18} className={pathname === menu.path ? '' : menu.color} />
                    </div>
                    <span className='text-sm font-semibold'>{menu.name}</span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* --- Footer Section --- */}
      <div className='mt-auto pt-6 border-t border-gray-50'>
        <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100 transition-colors'>
          <div className='relative'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md'>
              BC
            </div>
            <div className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <p className='text-sm font-bold text-gray-800 truncate'>Bikash Chandra</p>
            <p className='text-[10px] uppercase tracking-widest text-gray-400 font-bold'>Pro Admin</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            className='p-2 text-gray-400 hover:text-rose-500 transition-colors'
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;