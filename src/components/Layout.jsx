// src/components/Layout.jsx
import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { theme } = useLibrary();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex">
          {/* Sidebar responsive */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            className="hidden md:block md:w-64 flex-shrink-0"
          />

          {/* Contenido principal */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;