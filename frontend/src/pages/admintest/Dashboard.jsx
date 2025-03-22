// components/admin/DashboardLayout.jsx
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { 
  ChartBarIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  TruckIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import DashboardWelcome from './dashboardwelcome';
import { userActions } from '../../store/reducers/userReducer.js';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { pathname } = useLocation();
  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-20';

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon, current: pathname === '/admin/dashboard' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon, current: pathname.includes('orders') },
    { name: 'Products', href: '/admin/products', icon: CubeIcon, current: pathname.includes('products') },
    { name: 'Users', href: '/admin/users', icon: UsersIcon, current: pathname.includes('users') },
    { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon, current: pathname.includes('drivers') },
    { name: 'Support Tickets', href: '/admin/support', icon: Cog6ToothIcon, current: pathname.includes('support') },
    { name: 'Home', href: '/', icon: HomeIcon, current: pathname.includes('home') },
  ];

  const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
  toast.success("Logged out successfully");
};

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${sidebarWidth} transition-all duration-300 fixed top-0 left-0 h-full border-r bg-white dark:bg-gray-800 dark:border-gray-700`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
            ) : (
              <div className="w-8 h-8 bg-blue-500 rounded-full" />
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {isSidebarOpen ? (
                <ChevronDoubleLeftIcon className="w-5 h-5" />
              ) : (
                <ChevronDoubleRightIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  item.current 
                    ? 'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <item.icon className={`w-6 h-6 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {isSidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button onClick={logout} className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700">
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3 text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-6 overflow-y-auto`}>
       
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;