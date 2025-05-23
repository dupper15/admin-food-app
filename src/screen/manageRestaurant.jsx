import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaSearch } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PendingResModal from "../components/pendingResModal";

const ManageRestaurant = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const [showPending, setShowPending] = useState(false);

  const restaurants = [
    {
      _id: "67de302c5c568660258059bf",
      owner_id: {
        avatar:
          "https://th.bing.com/th/id/R.3cc588feaf371d15a08af29be09045f4?rik=2gvoIqWlRk7RjA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-msqjsqduxxk%2fUb33VLQWhtI%2fAAAAAAAAAEk%2fvNcs9dWUk6M%2fs1600%2f2-jollibee.jpeg&ehk=gpRZLHTFlXrGfVpvDho%2ftp74lW3ObQQVODZXz6LjQsU%3d&risl=&pid=ImgRaw&r=0",
      },
      name: "Hadilao235",
      total_reviews: 0,
      address: "ktx khu a dh quoc gia tp hcm",
      total_orders: 1,
      status: "Pending",
      banners: [
        "https://th.bing.com/th/id/OIP.4WJdGJ8gNs3l69Szh6Q76wHaE7?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.Vy4jzWD0lv5zDv3PZTblAAHaE7?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.rNPWtL_LZPHM1g2LNpvxNAHaEo?rs=1&pid=ImgDetMain",
      ],
    },
    {
      _id: "67de302c5c568660258059c0",
      owner_id: {
        avatar:
          "https://th.bing.com/th/id/R.3cc588feaf371d15a08af29be09045f4?rik=2gvoIqWlRk7RjA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-msqjsqduxxk%2fUb33VLQWhtI%2fAAAAAAAAAEk%2fvNcs9dWUk6M%2fs1600%2f2-jollibee.jpeg&ehk=gpRZLHTFlXrGfVpvDho%2ftp74lW3ObQQVODZXz6LjQsU%3d&risl=&pid=ImgRaw&r=0",
      },
      name: "Bún Bò Huế 123",
      total_reviews: 12,
      address: "123 Lê Văn Việt, Q.9, TP.HCM",
      total_orders: 50,
      status: "Pending",
      banners: [
        "https://th.bing.com/th/id/OIP.4WJdGJ8gNs3l69Szh6Q76wHaE7?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.Vy4jzWD0lv5zDv3PZTblAAHaE7?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.rNPWtL_LZPHM1g2LNpvxNAHaEo?rs=1&pid=ImgDetMain",
      ],
    },
    {
      _id: "67de302c5c568660258059c1",
      owner_id: {
        avatar:
          "https://res.cloudinary.com/dqj0xv8gk/image/upload/v1698231255/restaurant/owner/3.jpg",
      },
      name: "Cơm Tấm Cali",
      total_reviews: 30,
      address: "456 Nguyễn Trãi, Q.5, TP.HCM",
      total_orders: 100,
      status: "Enabled",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

  const itemsPerPage = 10;
  const filteredRestaurants = sortedRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='p-6 bg-slate-100 min-h-screen text-gray-900'>
      <h1 className='text-2xl font-bold mb-6'>Restaurant List</h1>
      <div className='mb-6 flex gap-4 items-center'>
        <div className='flex justify-between items-center w-full'>
          <div className='relative w-64'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
              <FaSearch />
            </span>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search restaurant name...'
              className='bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400'
            />
          </div>
          <button
            onClick={() => setShowPending(!showPending)}
            className='mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2'>
            {showPending ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className='overflow-x-auto rounded-lg shadow'>
        <table className='min-w-full bg-white text-sm'>
          <thead className='bg-yellow-500 text-black'>
            <tr>
              <th className='p-3 text-left'>Restaurant Id</th>
              <th
                className='p-3 text-left cursor-pointer'
                onClick={() => sortData("name")}>
                Name
                {sortConfig.key === "name" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortAlphaDown className='inline ml-1' />
                  ) : (
                    <FaSortAlphaUp className='inline ml-1' />
                  )
                ) : (
                  <FaSortAlphaDown className='inline ml-1 text-black' />
                )}
              </th>
              <th className='p-3 text-left'>Address</th>
              <th className='p-3 text-left'>Total Reviews</th>
              <th className='p-3 text-left'>Total Orders</th>
              <th
                className='p-3 text-left cursor-pointer'
                onClick={() => sortData("total_reviews")}>
                Rating
                {sortConfig.key === "total_reviews" ? (
                  sortConfig.direction === "asc" ? (
                    <MdOutlineKeyboardArrowDown className='inline ml-1' />
                  ) : (
                    <MdOutlineKeyboardArrowUp className='inline ml-1' />
                  )
                ) : (
                  <MdOutlineKeyboardArrowDown className='inline ml-1 text-black' />
                )}
              </th>
              <th
                className='p-3 text-left cursor-pointer'
                onClick={() => sortData("total_orders")}>
                Total Foods
                {sortConfig.key === "total_orders" ? (
                  sortConfig.direction === "asc" ? (
                    <MdOutlineKeyboardArrowDown className='inline ml-1' />
                  ) : (
                    <MdOutlineKeyboardArrowUp className='inline ml-1' />
                  )
                ) : (
                  <MdOutlineKeyboardArrowDown className='inline ml-1 text-black' />
                )}
              </th>
              <th className='p-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRestaurants.map((res, index) => (
              <tr key={res._id} className='border-t hover:bg-gray-50'>
                <td className='p-3'> {res._id.slice(-6)}</td>
                <td className='p-3 flex items-center gap-2'>
                  <img
                    src={res.owner_id.avatar}
                    alt='avatar'
                    className='w-8 h-8 rounded-full'
                  />
                  {res.name}
                </td>
                <td className='p-3'>{res.address}</td>
                <td className='p-3'>{res.total_reviews}</td>
                <td className='p-3'>{res.total_orders}</td>
                <td className='p-3'>
                  <span className='text-yellow-500 font-semibold'>
                    {res.total_reviews > 0
                      ? (4.0 + res.total_reviews / 100).toFixed(1)
                      : "4.0"}
                  </span>
                </td>
                <td className='p-3'>
                  <span className='bg-teal-500 text-white px-3 py-1 rounded-full'>
                    {res.total_orders}
                  </span>
                </td>
                <td className='p-4 relative text-center'>
                  <BsThreeDots
                    className='cursor-pointer text-yellow-600 hover:text-yellow-800 transition mx-auto'
                    onClick={() =>
                      setOpenMenuUserId(
                        openMenuUserId === res._id ? null : res._id
                      )
                    }
                  />
                  {openMenuUserId === res._id && (
                    <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-sm text-gray-700'>
                      <button
                        onClick={() => {}}
                        className='w-full text-left px-4 py-2 hover:bg-yellow-100'>
                        Disable
                      </button>
                      <a href='/restaurant-detail'>
                        <button className='w-full text-left px-4 py-2 hover:bg-yellow-100'>
                          View Detail
                        </button>
                      </a>
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
      {showPending && (
        <PendingResModal
          setShowPending={setShowPending}
          restaurants={restaurants.filter((res) => res.status === "Pending")}
        />
      )}
    </div>
  );
};

export default ManageRestaurant;
