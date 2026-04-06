import UserButton from '@/components/shared/UserButton';
import React from 'react';

const AdminNavbar = () => {
  return (
    <div className=' w-full flex items-center h-14 justify-between px-4 border-b shadow bg-white'>
      <div>
        <input
          type='text'
          placeholder='search'
          className=' border py-1 px-3 rounded'
        />
      </div>

      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default AdminNavbar;
