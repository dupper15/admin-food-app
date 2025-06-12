import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft, Package } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  getMonthlyDish,
  getPieChartProductSale,
  getTopTenDish,
  getTotalDish,
} from "../services/dashboardService";

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const DishesAnalytics = () => {
  const [viewMode, setViewMode] = useState("today");
  const [dishes, setDishes] = useState([]);
  const [dataToday, setDataToday] = useState({});
  const [dataSellingMonth, setDataSellingMonth] = useState([]);
  const [pieData, setPieData] = useState([]);

  const navigate = useNavigate();

  const getTopTenDishMutation = useMutation({
    mutationFn: async () => {
      return await getTopTenDish();
    },
    onSuccess: (data) => {
      setDishes(data);
      console.log("Fetch all success:", data);
    },
    onError: (error) => {
      console.error("Fetch all failed:", error);
    },
  });

  const getTotalTodayMutation = useMutation({
    mutationFn: async () => {
      return await getTotalDish();
    },
    onSuccess: (data) => {
      setDataToday(data);
      console.log("Fetch total today success:", data);
    },
    onError: (error) => {
      console.error("Fetch total today failed:", error);
    },
  });

  const getMonthlyDishMutation = useMutation({
    mutationFn: async () => {
      return await getMonthlyDish();
    },
    onSuccess: (data) => {
      setDataSellingMonth(data);
      console.log("Fetch monthly dish success:", data);
    },
    onError: (error) => {
      console.error("Fetch monthly dish failed:", error);
    },
  });

  const getPieChartDishMutation = useMutation({
    mutationFn: async (filter) => {
      return await getPieChartProductSale(filter);
    },
    onSuccess: (data) => {
      const dataWithColors = data.map((entry, i) => ({
        ...entry,
        color: COLORS[i % COLORS.length],
      }));
      setPieData(dataWithColors);
      console.log("Fetch pie chart success:", data);
    },
    onError: (error) => {
      console.error("Fetch pie chart failed:", error);
    },
  });

  useEffect(() => {
    getTopTenDishMutation.mutate();
    getTotalTodayMutation.mutate();
    getMonthlyDishMutation.mutate();
  }, []);

  useEffect(() => {
    getPieChartDishMutation.mutate(viewMode);
  }, [viewMode]);

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-slate-100 py-6 px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleBack}>
            {" "}
            <ArrowLeft size={26} />
          </button>
          <h1 className="text-3xl font-bold ">Dishes Analytics</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full h-40 bg-gradient-to-t from-[#72b0b5] to-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="bg-white/70 p-2 rounded-full">
                      <Package className="text-[#3CBAC6] w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Dishes</p>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {dataToday.totalDishes}
                      </h2>
                    </div>
                  </div>
                  <p className="text-emerald-600 font-semibold text-sm">
                    {dataToday?.totalDishesAddToday > 0
                      ? `+ ${dataToday.totalDishesAddToday.toLocaleString()} New added`
                      : "No new dishes today"}
                  </p>
                </div>
              </div>
              <svg
                className="absolute bottom-0 left-0 w-full z-0"
                viewBox="0 0 500 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,20 C150,60 350,-20 500,20 L500,50 L0,50 Z"
                  fill="#3CBAC6"
                  opacity="0.2"
                />
              </svg>
            </div>

            <div className="relative w-full h-40 bg-gradient-to-t from-yellow-400 to-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="bg-white p-2 rounded-full">
                      <Package className="text-yellow-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {dataToday?.totalOrders}
                      </h2>
                    </div>
                  </div>
                  <p className="text-emerald-600 font-semibold text-sm">
                    {dataToday?.totalOrdersToday > 0
                      ? `+ ${dataToday.totalOrdersToday.toLocaleString()} New added`
                      : "No new orders today"}
                  </p>
                </div>
              </div>
              <svg
                className="absolute bottom-0 left-0 w-full z-0"
                viewBox="0 0 500 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,20 C150,60 350,-20 500,20 L500,50 L0,50 Z"
                  fill="#FACC15"
                  opacity="0.2"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="font-semibold text-lg mb-4">
              Top 10 Selling Dishes
            </h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 bg-gray-50">
                <tr>
                  <th className="py-2 text-center">Top</th>
                  <th className="py-2 px-3">Dish</th>
                  <th className="py-2 px-3 ">Restaurant</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3 text-center">Total Orders</th>
                  <th className="py-2 px-3">Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish, index) => {
                  const isTop3 = index < 3;
                  const rowBg = index % 2 === 0 ? "bg-gray-50" : "bg-white";

                  return (
                    <tr
                      key={dish._id}
                      className={`${rowBg} border-t hover:bg-gray-100`}
                    >
                      <td className="py-3 px-3 text-center">
                        {isTop3 ? (
                          <span
                            title={`Top ${index + 1}`}
                            className="text-yellow-400 text-lg"
                          >
                            🏅
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            className="w-10 h-10 rounded-full object-cover"
                            alt={dish.name}
                          />
                          <span className="font-medium text-gray-800">
                            {dish.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {dish.restaurant_name}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {dish.price.toLocaleString()}đ
                      </td>
                      <td className="py-3 px-3 text-gray-700 text-center">
                        {dish.total_order}
                      </td>
                      <td className="py-3 px-3 font-semibold text-left text-cyan-500">
                        {dish.total_sale.toLocaleString() + "đ"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="font-semibold text-lg mb-4">
              Selling Dishes by Month
            </h2>
            {dataSellingMonth.map((entry, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{entry?.month}</span>
                  <span>{entry?.value.toLocaleString()}</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full">
                  <div
                    className="h-4 rounded-full"
                    style={{
                      width: `${(entry?.value / 10) * 100}%`,
                      backgroundColor: index % 2 === 0 ? "#FEC53D" : "#219EBC",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Product Sales Analytics</h2>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setViewMode("today")}
                  className={`px-3 py-1 text-lg rounded ${
                    viewMode === "today"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  Today
                </button>

                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1 rounded text-lg ${
                    viewMode === "month"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  This Month
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} units`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 text-xs mt-4 px-2">
              {pieData.map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: entry.color }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesAnalytics;
