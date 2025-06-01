import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import DetailModal from "../components/detailModal";
import CreateAdminModal from "../components/createAdminModal";
import { UserPlus } from "lucide-react";
import {
  changeStatusUser,
  createAdmin,
  fetchAllUser,
} from "./../services/userService";
import { useMutation } from "@tanstack/react-query";
import { formatID } from "./../utils/formatID";
import { debounce } from "lodash";
const ManageUser = () => {
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const handleDisable = (userId) => {
    changeStatus.mutate(userId);
  };
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const handleViewDetail = (user, type) => {
    setSelectedUser(user);
    setSelectedType(type);
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [countUser, setCountUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = useCallback(
    debounce((val) => {
      setDebouncedSearch(val);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debounceSearch(val);
  };

  const getAllUser = useMutation({
    mutationFn: async ({ page, limit, filter, q }) => {
      return await fetchAllUser(page, limit, filter, q);
    },
    onSuccess: (data) => {
      setUsers(data.data);
      setCountUser(data.total);
      setIsLoading(false);
      console.log("Fetch user success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch user failed:", error);
    },
  });

  const changeStatus = useMutation({
    mutationFn: async (id) => {
      return await changeStatusUser(id);
    },
    onSuccess: () => {
      setRefresh(!refresh);
      console.log("Change status restaurant success:");
    },
    onError: (error) => {
      console.error("Change status restaurant failed:", error);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getAllUser.mutate({
      page: currentPage,
      limit: itemsPerPage,
      filter: debouncedSearch,
      q: searchTerm,
    });
  }, [currentPage, selectedRole, debouncedSearch, refresh]);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(countUser / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">User List</h1>
      <div className="flex justify-between items-center mb-6">
        <div className=" flex gap-4 items-center">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search users..."
              className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="owner">Restaurant owner</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateAdmin(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <UserPlus size={20} />
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-yellow-500 text-black uppercase text-sm">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <div className="inline-flex items-center gap-2 text-yellow-600">
                    <svg
                      className="animate-spin h-6 w-6 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Loading users...</span>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} ${
                    user.status === "Disable" ? "opacity-50" : ""
                  }
                     hover:bg-yellow-50 transition`}
                >
                  <td className="p-4 font-semibold text-gray-900">
                    {formatID(user._id)}
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}`
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <span>{user.name || "No Name"}</span>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Customer"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-yellow-200 text-yellow-900"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 relative text-center">
                    <BsThreeDots
                      className="cursor-pointer text-yellow-600 hover:text-yellow-800 transition mx-auto"
                      onClick={() =>
                        setOpenMenuUserId(
                          openMenuUserId === user._id ? null : user._id
                        )
                      }
                    />

                    {openMenuUserId === user._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-sm text-gray-700">
                        <button
                          onClick={() => {
                            handleDisable(user._id);
                            setOpenMenuUserId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                        >
                          {user.status === "Disable" ? "Enable" : "Disable"}
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuUserId(null);
                            handleViewDetail(user, user.role);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                        >
                          View Detail
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition"
            onClick={() => goToPage(currentPage - 1)}
          >
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
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition"
            onClick={() => goToPage(currentPage + 1)}
          >
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
      {showCreateAdmin && (
        <CreateAdminModal
          setShowCreateAdmin={setShowCreateAdmin}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
};
export default ManageUser;
