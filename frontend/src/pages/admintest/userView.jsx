import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllUsers , deleteUser , changeUserRoleToAdmin } from '../../../services/userService.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);    // State to store the list of users
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // State to handle errors
    const userStore = useSelector((state) => state.user);
  
    useEffect(() => {
        const fetchUsers = async () => {
        const token = userStore.userInfo.token;
          if (!token) {
            setError('No token found');
            setLoading(false);
            return;
          }
    
          try {
            const userData = await getAllUsers(token);
    
            console.log('API Response:', userData);  // Log the response to check its format
    
            if (Array.isArray(userData)) {
              setUsers(userData);  // Only set users if it's an array
            } else {
              throw new Error('The response is not in the expected array format');
            }
          } catch (err) {
            setError('Failed to fetch users: ' + err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []); 
      

      const handleAssignAdmin = async (userId) => {
        const token = userStore.userInfo.token;
        if (!token) {
          toast.error('No token found');
          return;
        }
        try {
          const response = await changeUserRoleToAdmin(userId, token);
          toast.success('User role updated to admin successfully');
        } catch (error) {
          toast.error('Failed to update user role: ' + error.message);
        }
      };
      


      const handleDeleteUser = async (userId) => {
        const token = userStore.userInfo.token;
        if (!token) {
          toast.error('No token found');
          return;
        }
    
        try {
          const response = await deleteUser({ userId, token });
          toast.success('User deleted successfully');
          // Remove the deleted user from the list
          setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
          toast.error('Failed to delete user: ' + error.message);
        }
      };




  
      if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          </div>
        );  // Display loading spinner while data is being fetched
      }
    
      if (error) {
        return (
          <div className="flex justify-center items-center h-screen text-red-600">
            <div className="text-lg">{error}</div>  {/* Display the error message if there's an error */}
          </div>
        );
      }
  
    return (
        <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">User List</h1>
        <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex space-x-2">
                    {user.role !== 'Admin' && (
                      <button
                        onClick={() => handleAssignAdmin(user._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                      >
                        Assign Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };    
  

  export default User;