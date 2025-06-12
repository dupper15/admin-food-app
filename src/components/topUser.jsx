import { useMutation } from "@tanstack/react-query";
import React, { useState, useMemo, useEffect } from "react";
import { getTopTenUser } from "../services/dashboardService";
import { formatTimeSpent } from "../utils/formatTimeSpent";

const TopUser = () => {
  const [filter, setFilter] = useState("login");
  const [sortBy, setSortBy] = useState("desc");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTopTenUserMutation = useMutation({
    mutationFn: async ({ filter, sortBy }) => {
      return await getTopTenUser(filter, sortBy);
    },
    onSuccess: (data) => {
      setUsers(data);
      setIsLoading(false);
      console.log("Fetch all success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch all failed:", error);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getTopTenUserMutation.mutate({
      filter: filter,
      sortBy: sortBy,
    });
  }, [filter, sortBy]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-lg font-semibold mb-4">Top Users</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label
            className="text-gray-700 font-medium whitespace-nowrap"
            htmlFor="criteria"
          >
            Select criteria:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="login">Top Logins</option>
            <option value="order">Top Orders</option>
            <option value="time">Top Time Spent</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label
            className="text-gray-700 font-medium whitespace-nowrap"
            htmlFor="order"
          >
            Order:
          </label>
          <select
            id="sorderBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-yellow-500 font-semibold animate-pulse text-lg">
            Loading top restaurants...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-6 p-4 bg-yellow-50 border border-yellow-400 rounded-lg shadow"
            >
              <img
                src={
                  user.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div className="space-y-1">
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-gray-600">📧 {user.email}</div>
                <div className="text-sm text-gray-600">📞 {user.phone}</div>
                <div className="text-sm">🔐 Logins: {user.total_logins}</div>
                <div className="text-sm">🛒 Orders: {user.total_orders}</div>
                <div className="text-sm">
                  ⏱ Time: {formatTimeSpent(user.total_time_spent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUser;
