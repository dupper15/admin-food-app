import { useCallback, useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaSearch } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PendingResModal from "../components/pendingResModal";
import { useMutation } from "@tanstack/react-query";
import {
  changeStatusRestaurant,
  fetchAllRestaurant,
} from "../services/restaurantService";
import { formatID } from "../utils/formatID";
import { debounce } from "lodash";

const ManageRestaurant = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [countRestaurant, setCountRestaurant] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(countRestaurant / itemsPerPage);

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

  const getAllRestaurant = useMutation({
    mutationFn: async ({ page, limit, q }) => {
      return await fetchAllRestaurant(page, limit, q);
    },
    onSuccess: (data) => {
      setRestaurants(data.data);
      setCountRestaurant(data.total);
      setIsLoading(false);
      console.log("Fetch restaurant success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch restaurant failed:", error);
    },
  });

  const changeStatus = useMutation({
    mutationFn: async (id) => {
      return await changeStatusRestaurant(id);
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
    getAllRestaurant.mutate({
      page: currentPage,
      limit: itemsPerPage,
      q: debouncedSearch,
    });
  }, [currentPage, debouncedSearch, refresh]);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "name") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDisable = (resId) => {
    changeStatus.mutate(resId);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Restaurant List</h1>
      <div className="mb-6 flex gap-4 items-center">
        <div className="flex justify-between items-center w-full">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search restaurant name..."
              className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            onClick={() => setShowPending(!showPending)}
            className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2"
          >
            {showPending ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => sortData("name")}
              >
                Name
                {sortConfig.key === "name" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortAlphaDown className="inline ml-1" />
                  ) : (
                    <FaSortAlphaUp className="inline ml-1" />
                  )
                ) : (
                  <FaSortAlphaDown className="inline ml-1 text-black" />
                )}
              </th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Total Reviews</th>
              <th className="p-3 text-left">Total Orders</th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => sortData("total_reviews")}
              >
                Rating
                {sortConfig.key === "total_reviews" ? (
                  sortConfig.direction === "asc" ? (
                    <MdOutlineKeyboardArrowDown className="inline ml-1" />
                  ) : (
                    <MdOutlineKeyboardArrowUp className="inline ml-1" />
                  )
                ) : (
                  <MdOutlineKeyboardArrowDown className="inline ml-1 text-black" />
                )}
              </th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => sortData("total_orders")}
              >
                Total Foods
                {sortConfig.key === "total_orders" ? (
                  sortConfig.direction === "asc" ? (
                    <MdOutlineKeyboardArrowDown className="inline ml-1" />
                  ) : (
                    <MdOutlineKeyboardArrowUp className="inline ml-1" />
                  )
                ) : (
                  <MdOutlineKeyboardArrowDown className="inline ml-1 text-black" />
                )}
              </th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
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
                    <span>Loading restaurants...</span>
                  </div>
                </td>
              </tr>
            ) : (
              restaurants.map((res, index) => (
                <tr
                  key={res._id}
                  className={`border-t hover:bg-gray-50 ${
                    res.status === "Disable" ? "opacity-50" : ""
                  }`}
                >
                  <td className="p-3"> {formatID(res._id)}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={res.owner_id.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    {res.name}
                  </td>
                  <td className="p-3">{res.address}</td>
                  <td className="p-3">{res.total_reviews}</td>
                  <td className="p-3">{res.total_orders}</td>
                  <td className="p-3">
                    <span className="text-yellow-500 font-semibold">
                      {res.averageRating === 0
                        ? 0
                        : res.averageRating.toFixed(1)}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full">
                      {res.totalDishes}
                    </span>
                  </td>
                  <td className="p-4 relative text-center">
                    <BsThreeDots
                      className="cursor-pointer text-yellow-600 hover:text-yellow-800 transition mx-auto"
                      onClick={() =>
                        setOpenMenuUserId(
                          openMenuUserId === res._id ? null : res._id
                        )
                      }
                    />
                    {openMenuUserId === res._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-sm text-gray-700">
                        <button
                          onClick={() => {
                            handleDisable(res._id);
                            setOpenMenuUserId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                        >
                          {res.status === "Disable" ? "Enable" : "Disable"}
                        </button>
                        <a href="/restaurant-detail">
                          <button className="w-full text-left px-4 py-2 hover:bg-yellow-100">
                            View Detail
                          </button>
                        </a>
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
      {showPending && (
        <PendingResModal
          setShowPending={setShowPending}
          showPending={showPending}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default ManageRestaurant;
