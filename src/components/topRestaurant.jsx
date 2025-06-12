import { useState, useEffect } from "react";
import { getTopTenRestaurant } from "../services/dashboardService";
import { useMutation } from "@tanstack/react-query";

const TopRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("order");
  const [sortBy, setSortBy] = useState("desc");

  const getTopTenRestaurantMutation = useMutation({
    mutationFn: async ({ filter, sortBy }) => {
      return await getTopTenRestaurant(filter, sortBy);
    },
    onSuccess: (data) => {
      setRestaurants(data);
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
    getTopTenRestaurantMutation.mutate({
      filter: filter,
      sortBy: sortBy,
    });
  }, [filter, sortBy]);

  return (
    <div className="bg-white p-6 rounded-xl h-full shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top 10 restaurants</h2>

      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="criteria" className="text-gray-700 font-medium">
            Select criteria:
          </label>
          <select
            id="criteria"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="order">Top Orders</option>
            <option value="revenue">Top Revenue</option>
            <option value="review">Top Reviews</option>
            <option value="rating">Top Rating</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="order" className="text-gray-700 font-medium">
            Order:
          </label>
          <select
            id="order"
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
        <div className="overflow-x-auto">
          <table className="w-full border border-yellow-500 rounded-lg shadow">
            <thead className="bg-black text-yellow-400">
              <tr>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Orders</th>
                <th className="px-4 py-2">Reviews</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((rest, index) => {
                return (
                  <tr
                    key={rest._id}
                    className={
                      index % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
                    }
                  >
                    <td className="px-4 py-2 text-center">
                      <img
                        src={rest?.avatar}
                        alt="avatar"
                        className="w-10 h-10 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">{rest?.name}</td>
                    <td className="px-4 py-2 text-center">{rest?.address}</td>
                    <td className="px-4 py-2 text-center">
                      {rest?.totalOrders}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {rest?.totalReviews}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {rest?.averageRating}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {rest.totalRevenue.toLocaleString()} VND
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopRestaurant;
