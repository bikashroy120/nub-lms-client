'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, icons, LayoutDashboard, User, Users } from 'lucide-react';
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
    },
    {
      name: 'Users',
      icon: Users,
      children: [
        {
          name: 'All Users',
          path: '/dashboard/admin/user',
        },
        {
          name: 'Add Users',
          path: '/dashboard/admin/user/add',
        },
      ],
    },
    {
      name: 'Courses',
      icon: Users,
      children: [
        {
          name: 'Category',
          path: '/dashboard/admin/course/category',
        },
        {
          name: 'All Courses',
          path: '/dashboard/admin/course',
        },
        {
          name: 'Add Course',
          path: '/dashboard/admin/course/add',
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      className='w-64 h-full p-4 border-r shadow'
    >
      <h2 className=' text-primary font-bold text-xl mb-5'>Learn Hub</h2>

      <ul className=' space-y-2'>
        {menus.map((menu, index) => {
          const Icon = menu.icon;
          const isParentActive =
            menu.children?.some((child) => pathname === child.path) ||
            pathname === menu.path;
          return (
            <li key={index}>
              {menu.children ? (
                <>
                  <button
                    onClick={() => setOpen(open === index ? null : index)}
                    className={`w-full flex items-center justify-between py-2 px-2 rounded transition-colors ${
                      isParentActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className=' flex items-center gap-2'>
                      <Icon size={18} />
                      {menu.name}
                    </div>

                    <motion.div animate={{ rotate: open === index ? 180 : 0 }}>
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {open === index && (
                      <motion.ul
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className=' ml-6 mt-2 space-y-2 overflow-hidden'
                      >
                        {menu.children.map((child, i) => {
                          const isActive = pathname === child.path;
                          return (
                            <li key={i}>
                              <Link
                                href={child.path}
                                className={`py-2 px-2 flex items-center rounded transition-all ${
                                  isActive
                                    ? 'bg-primary text-white font-medium'
                                    : 'hover:bg-gray-200 text-gray-600'
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <Link
                    href={menu.path}
                    className={`py-2 px-2 flex items-center gap-2 w-full rounded transition-all ${
                      pathname === menu.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {menu.name}
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default AdminSidebar;
