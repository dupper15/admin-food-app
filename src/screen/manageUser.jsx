import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import DetailModal from "../components/detailModal";
const ManageUser = () => {
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const handleDisable = (userId) => {
    console.log("Disable user:", userId);
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const handleViewDetail = (user, type) => {
    setSelectedUser(user);
    setSelectedType(type);
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const customers = [
    {
      _id: "67d9214bf4722d58ebc02690",
      email: "naruto@gmail.com",
      isVerified: true,
      status: "Enable",
      name: "Naruto Uzumaki",
      avatar: "",
      address: [],
      phone: "0908765597",
      total_logins: 96,
      total_orders: 1,
      total_time_spent: 31188761,
      last_login: "1970-01-01T00:00:00.000+00:00",
      isDeleted: false,
    },
    {
      _id: "67d9214bf4722d58ebc02691",
      email: "sakura@gmail.com",
      isVerified: true,
      status: "Enable",
      name: "Sakura Haruno",
      avatar: "",
      address: [],
      phone: "0908765598",
      total_logins: 45,
      total_orders: 4,
      total_time_spent: 2212311,
      last_login: "2024-05-01T12:00:00.000+00:00",
      isDeleted: false,
    },
    {
      _id: "67d9214bf4722d58ebc02692",
      email: "kakashi@gmail.com",
      isVerified: true,
      status: "Enable",
      name: "Kakashi Hatake",
      avatar: "",
      address: [],
      phone: "0908765599",
      total_logins: 120,
      total_orders: 10,
      total_time_spent: 5123451,
      last_login: "2025-05-10T08:45:00.000+00:00",
      isDeleted: false,
    },
    {
      _id: "67d9214bf4722d58ebc02693",
      email: "ino@gmail.com",
      isVerified: false,
      status: "Enable",
      name: "Ino Yamanaka",
      avatar: "",
      address: [],
      phone: "0908765600",
      total_logins: 15,
      total_orders: 2,
      total_time_spent: 931111,
      last_login: "2025-04-20T09:00:00.000+00:00",
      isDeleted: false,
    },
    {
      _id: "67d9214bf4722d58ebc02694",
      email: "shikamaru@gmail.com",
      isVerified: true,
      status: "Enable",
      name: "Shikamaru Nara",
      avatar: "",
      address: [],
      phone: "0908765601",
      total_logins: 78,
      total_orders: 6,
      total_time_spent: 3123456,
      last_login: "2025-05-15T15:00:00.000+00:00",
      isDeleted: false,
    },
  ];
  const restaurant_owners = [
    {
      _id: "67d924ca7b6ab86d9f93d230",
      email: "sasuke@gmail.com",
      isVerified: true,
      status: "Enable",
      avatar:
        "https://res.cloudinary.com/dbfswwomz/image/upload/v1745584724/uploads/sasuke.png",
      total_time_spent: 2986451,
      total_logins: 29,
      phone: "090768t7",
      isDeleted: false,
    },
    {
      _id: "67d924ca7b6ab86d9f93d231",
      email: "itachi@gmail.com",
      isVerified: true,
      status: "Enable",
      avatar:
        "https://res.cloudinary.com/dbfswwomz/image/upload/v1745584724/uploads/itachi.png",
      total_time_spent: 4123456,
      total_logins: 40,
      phone: "0907680001",
      isDeleted: false,
    },
    {
      _id: "67d924ca7b6ab86d9f93d232",
      email: "jiraiya@gmail.com",
      isVerified: true,
      status: "Enable",
      avatar:
        "https://res.cloudinary.com/dbfswwomz/image/upload/v1745584724/uploads/jiraiya.png",
      total_time_spent: 812345,
      total_logins: 15,
      phone: "0907680002",
      isDeleted: false,
    },
    {
      _id: "67d924ca7b6ab86d9f93d233",
      email: "kurenai@gmail.com",
      isVerified: true,
      status: "Enable",
      avatar:
        "https://res.cloudinary.com/dbfswwomz/image/upload/v1745584724/uploads/kurenai.png",
      total_time_spent: 1234567,
      total_logins: 20,
      phone: "0907680003",
      isDeleted: false,
    },
    {
      _id: "67d924ca7b6ab86d9f93d234",
      email: "choji@gmail.com",
      isVerified: false,
      status: "Enable",
      avatar:
        "https://res.cloudinary.com/dbfswwomz/image/upload/v1745584724/uploads/choji.png",
      total_time_spent: 2345678,
      total_logins: 18,
      phone: "0907680004",
      isDeleted: false,
    },
  ];

  const admins = [
    {
      _id: "67fc8c910256ce19fe837b79",
      email: "example@gmail.com",
      status: "Enable",
    },
    {
      _id: "67fc8c910256ce19fe837b80",
      email: "admin1@gmail.com",
      status: "Enable",
    },
    {
      _id: "67fc8c910256ce19fe837b81",
      email: "admin2@gmail.com",
      status: "Enable",
    },
    {
      _id: "67fc8c910256ce19fe837b82",
      email: "admin3@gmail.com",
      status: "Enable",
    },
    {
      _id: "67fc8c910256ce19fe837b83",
      email: "admin4@gmail.com",
      status: "Enable",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    ...customers.map((user) => ({ ...user, role: "Customer" })),
    ...restaurant_owners.map((user) => ({ ...user, role: "Restaurant Owner" })),
    ...admins.map((user) => ({ ...user, role: "Admin" })),
  ];
  const [selectedRole, setSelectedRole] = useState("All");
  const filteredUsers = users.filter((user) => {
    const roleMatch =
      selectedRole === "All" || user.role.trim() === selectedRole.trim();
    const nameMatch = user.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return roleMatch && nameMatch;
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className='p-6 bg-slate-100 min-h-screen text-gray-900'>
      <h1 className='text-2xl font-bold mb-6 text-slate-900'>User List</h1>

      <div className='mb-6 flex gap-4 items-center'>
        <div className='relative w-64'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
            <FaSearch />
          </span>
          <input
            type='text'
            placeholder='Search users...'
            className='bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className='bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400'
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}>
          <option value='All'>All Roles</option>
          <option value='Admin'>Admin</option>
          <option value='Customer'>Customer</option>
          <option value='Editor'>Restaurant Owner</option>
        </select>
      </div>

      <div className='overflow-x-auto bg-white rounded-lg shadow-md'>
        <table className='min-w-full table-auto'>
          <thead className='bg-yellow-500 text-black uppercase text-sm'>
            <tr>
              <th className='p-4 text-left'>User ID</th>
              <th className='p-4 text-left'>Name</th>
              <th className='p-4 text-left'>Email</th>
              <th className='p-4 text-left'>Phone</th>
              <th className='p-4 text-left'>Role</th>
              <th className='p-4 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-800'>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                } hover:bg-yellow-50 transition`}>
                <td className='p-4 font-semibold text-gray-900'>
                  {user._id.slice(-6)}
                </td>
                <td className='p-4 flex items-center gap-3'>
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "User"
                      )}`
                    }
                    alt='avatar'
                    className='w-8 h-8 rounded-full border border-gray-300'
                  />
                  <span>{user.name || "No Name"}</span>
                </td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>{user.phone}</td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "Customer"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-yellow-200 text-yellow-900"
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className='p-4 relative text-center'>
                  <BsThreeDots
                    className='cursor-pointer text-yellow-600 hover:text-yellow-800 transition mx-auto'
                    onClick={() =>
                      setOpenMenuUserId(
                        openMenuUserId === user._id ? null : user._id
                      )
                    }
                  />

                  {openMenuUserId === user._id && (
                    <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-sm text-gray-700'>
                      <button
                        onClick={() => {
                          handleDisable(user._id);
                          setOpenMenuUserId(null);
                        }}
                        className='w-full text-left px-4 py-2 hover:bg-yellow-100'>
                        Disable
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuUserId(null);
                          handleViewDetail(user, user.role);
                        }}
                        className='w-full text-left px-4 py-2 hover:bg-yellow-100'>
                        View Detail
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center mt-8'>
        <div className='flex items-center gap-2'>
          <button
            className='px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition'
            onClick={() => goToPage(currentPage - 1)}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded font-medium transition ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-white border border-yellow-500 text-yellow-600 hover:bg-yellow-100"
              }`}>
              {i + 1}
            </button>
          ))}
          <button
            className='px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition'
            onClick={() => goToPage(currentPage + 1)}>
            {">"}
          </button>
        </div>
      </div>
      {show && (
        <DetailModal
          data={selectedUser}
          type={selectedType}
          setShow={setShow}
        />
      )}
    </div>
  );
};
export default ManageUser;
