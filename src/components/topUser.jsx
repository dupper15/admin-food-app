import React, { useState, useMemo } from "react";

const TopUser = () => {
  const users = [
    {
      _id: "67d9214bf4722d58ebc02690",
      email: "naruto@gmail.com",
      name: "Naruto",
      avatar: "",
      phone: "0908765597",
      total_logins: 96,
      total_orders: 1,
      total_time_spent: 31188761,
    },
    {
      _id: "67d9214bf4722d58ebc02691",
      email: "sasuke@gmail.com",
      name: "Sasuke",
      avatar:
        "https://i.pinimg.com/736x/e6/83/91/e68391b07eb04e28d70891ddba2c3e18.jpg",
      phone: "0901122334",
      total_logins: 120,
      total_orders: 10,
      total_time_spent: 50000000,
    },
    {
      _id: "67d9214bf4722d58ebc02692",
      email: "sakura@gmail.com",
      name: "Sakura",
      avatar: "",
      phone: "0903344556",
      total_logins: 80,
      total_orders: 5,
      total_time_spent: 25000000,
    },
  ];

  const [criteria, setCriteria] = useState("total_logins");
  const [order, setOrder] = useState("desc");

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const valA = a[criteria] || 0;
      const valB = b[criteria] || 0;
      return order === "asc" ? valA - valB : valB - valA;
    });
  }, [criteria, order]);

  const formatTimeSpent = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm w-full'>
      <h2 className='text-lg font-semibold mb-4'>Top Users</h2>

      <div className='flex flex-wrap gap-4 mb-6'>
        <div className='flex items-center gap-2'>
          <label
            className='text-gray-700 font-medium whitespace-nowrap'
            htmlFor='criteria'>
            Select criteria:
          </label>
          <select
            id='criteria'
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value='total_logins'>Top Logins</option>
            <option value='total_orders'>Top Orders</option>
            <option value='total_time_spent'>Top Time Spent</option>
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <label
            className='text-gray-700 font-medium whitespace-nowrap'
            htmlFor='order'>
            Order:
          </label>
          <select
            id='order'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        {sortedUsers.map((user) => (
          <div
            key={user._id}
            className='flex items-center gap-6 p-4 bg-yellow-50 border border-yellow-400 rounded-lg shadow'>
            <img
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt='avatar'
              className='w-20 h-20 object-cover rounded-full'
            />
            <div className='space-y-1'>
              <div className='font-bold text-lg'>{user.name}</div>
              <div className='text-sm text-gray-600'>📧 {user.email}</div>
              <div className='text-sm text-gray-600'>📞 {user.phone}</div>
              <div className='text-sm'>🔐 Logins: {user.total_logins}</div>
              <div className='text-sm'>🛒 Orders: {user.total_orders}</div>
              <div className='text-sm'>
                ⏱ Time: {formatTimeSpent(user.total_time_spent)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUser;
