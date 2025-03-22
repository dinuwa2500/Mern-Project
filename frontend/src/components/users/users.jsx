import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/userService";
import { useSelector } from "react-redux";

const Users = () => {
  const userState = useSelector((state) => state.user);

  const { data: usersData, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(userState.userInfo.token),
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Admin</th>
            <th className="border border-gray-300 px-4 py-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.data?.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.admin ? "✅" : "❌"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.verified ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
