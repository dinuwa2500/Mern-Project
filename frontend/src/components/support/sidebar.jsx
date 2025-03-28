import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const userStore = useSelector((state) => state.user);
  
  return (

    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed left-0 top-0">
      <div className="text-2xl font-bold mb-8 px-4">Support Dashboard</div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tickets"
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              🎫 Tickets
            </NavLink>
          </li>
          {userStore.userInfo?.role === 'admin' && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                👥 Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              📈 Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
      
    </div>
    
  );
};

export default Sidebar;

