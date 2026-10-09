import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-56">
        {/* Top Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
