// components/admin/DashboardWelcome.jsx
import { UsersIcon, CubeIcon } from '@heroicons/react/24/outline';

const DashboardWelcome = ({ user, userCount, productCount }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's what's happening with your store today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{userCount}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <UsersIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 dark:text-green-400">
              +12.3% from last month
            </span>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{productCount}</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <CubeIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 dark:text-green-400">
              +5.8% new products added
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;