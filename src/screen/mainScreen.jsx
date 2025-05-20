import React, { createContext, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Home,
  User,
  ArrowLeft,
  MessageSquare,
  Settings,
  Utensils,
  LogOut,
} from "lucide-react";

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
      {...props}>
      {children}
    </button>
  );
};

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div
      className={`h-screen bg-gray-900 text-white p-4 transition-all duration-300 shadow-xl relative z-50 flex flex-col justify-between ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}>
      <SidebarTrigger className='absolute top-4 right-4' />

      <div>
        <h2
          className={`text-2xl font-bold text-yellow-400 mb-10 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}>
          My Dashboard
        </h2>

        <ul className='space-y-4'>
          <li>
            <Link
              to='/main/home'
              className={`flex items-center ${
                isSidebarOpen ? "gap-3" : "justify-center"
              } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200`}>
              <Home className='w-5 h-5 flex-shrink-0' />
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isSidebarOpen
                    ? "opacity-100 ml-1 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}>
                Home
              </span>
            </Link>
          </li>

          <li>
            <Link
              to='/main/user'
              className={`flex items-center ${
                isSidebarOpen ? "gap-3" : "justify-center"
              } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200`}>
              <User className='w-5 h-5 flex-shrink-0' />
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isSidebarOpen
                    ? "opacity-100 ml-1 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}>
                User
              </span>
            </Link>
          </li>

          <li>
            <Link
              to='/main/restaurant'
              className={`flex items-center ${
                isSidebarOpen ? "gap-3" : "justify-center"
              } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200`}>
              <Utensils className='w-5 h-5 flex-shrink-0' />
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isSidebarOpen
                    ? "opacity-100 ml-1 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}>
                Restaurant
              </span>
            </Link>
          </li>

          <li>
            <Link
              to='/main/reflect'
              className={`flex items-center ${
                isSidebarOpen ? "gap-3" : "justify-center"
              } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200`}>
              <MessageSquare className='w-5 h-5 flex-shrink-0' />
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isSidebarOpen
                    ? "opacity-100 ml-1 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}>
                Reflect
              </span>
            </Link>
          </li>

          <li>
            <Link
              to='/main/notification_voucher'
              className={`flex items-center ${
                isSidebarOpen ? "gap-3" : "justify-center"
              } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200`}>
              <Settings className='w-5 h-5 flex-shrink-0' />
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isSidebarOpen
                    ? "opacity-100 ml-1 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}>
                Utilities
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className='pt-6 border-t border-gray-700'>
        <a
          href='/'
          className={`flex items-center ${
            isSidebarOpen ? "gap-3" : "justify-center"
          } px-3 py-2 rounded-md hover:bg-gray-800 hover:text-red-400 transition-all duration-200`}>
          <LogOut className='w-5 h-5 flex-shrink-0' />
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              isSidebarOpen
                ? "opacity-100 ml-1 w-auto"
                : "opacity-0 w-0 overflow-hidden"
            }`}>
            Log out
          </span>
        </a>
      </div>
    </div>
  );
};

const SidebarTrigger = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar='trigger'
        variant='ghost'
        size='icon'
        className={`h-7 w-7 flex items-center justify-center ${className}`}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}>
        <p>
          <ArrowLeft className='w-5 h-5 text-white' />
        </p>
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    );
  }
);

const Layout = () => {
  return (
    <SidebarProvider>
      <div className='flex w-screen h-screen overscroll-none'>
        <Sidebar />
        <main className='w-full h-screen overflow-hidden'>
          <div className='h-full overflow-y-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
