import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft, Package } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DishesAnalytics = () => {
  const [viewMode, setViewMode] = useState("today");
  const dataSellingMonth = [
    { name: "Jan", value: 23400 },
    { name: "Feb", value: 15000 },
    { name: "Mar", value: 30000 },
    { name: "Apr", value: 22000 },
    { name: "May", value: 10000 },
    { name: "Jun", value: 23400 },
    { name: "Jul", value: 5000 },
  ];
  const top10SellingDishes = [
    {
      _id: "1",
      name: "Cơm gà chiên rau củ",
      price: 30000,
      image: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png",
      total_orders: 120,
      restaurant_id: {
        _id: "1",
        name: "Andree Restaurant",
      },
    },
    {
      _id: "2",
      name: "Phở bò tái",
      price: 40000,
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      total_orders: 250,
      restaurant_id: {
        _id: "2",
        name: "Phở 24",
      },
    },
    {
      _id: "3",
      name: "Bánh mì thịt nướng",
      price: 20000,
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      total_orders: 300,
      restaurant_id: {
        _id: "3",
        name: "Bánh Mì Ông Tý",
      },
    },
    {
      _id: "4",
      name: "Bún chả Hà Nội",
      price: 35000,
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      total_orders: 180,
      restaurant_id: {
        _id: "4",
        name: "Quán Bún Chả 1982",
      },
    },
    {
      _id: "5",
      name: "Hủ tiếu Nam Vang",
      price: 32000,
      image: "https://cdn-icons-png.flaticon.com/512/135/135620.png",
      total_orders: 220,
      restaurant_id: {
        _id: "5",
        name: "Hủ Tiếu Cô Ba",
      },
    },
    {
      _id: "6",
      name: "Gỏi cuốn tôm thịt",
      price: 25000,
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
      total_orders: 140,
      restaurant_id: {
        _id: "6",
        name: "Gỏi Cuốn Quê Tôi",
      },
    },
    {
      _id: "7",
      name: "Bánh xèo miền Trung",
      price: 30000,
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046796.png",
      total_orders: 160,
      restaurant_id: {
        _id: "7",
        name: "Bánh Xèo Cô Ba",
      },
    },
    {
      _id: "8",
      name: "Mì Quảng",
      price: 33000,
      image: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
      total_orders: 190,
      restaurant_id: {
        _id: "8",
        name: "Quán Mì Quảng Dì Lan",
      },
    },
    {
      _id: "9",
      name: "Bánh cuốn nhân thịt",
      price: 28000,
      image: "https://cdn-icons-png.flaticon.com/512/2703/2703012.png",
      total_orders: 210,
      restaurant_id: {
        _id: "9",
        name: "Bánh Cuốn Gia Truyền",
      },
    },
    {
      _id: "10",
      name: "Cháo sườn nóng",
      price: 30000,
      image: "https://cdn-icons-png.flaticon.com/512/888/888865.png",
      total_orders: 170,
      restaurant_id: {
        _id: "10",
        name: "Cháo Sườn Cô Tấm",
      },
    },
  ];

  const pieDataToday = [
    { name: "Total Order", value: 50, color: "#219EBC" },
    { name: "Order Cancel", value: 10, color: "#FF595E" },
    { name: "Total Order Again", value: 30, color: "#FEC53D" },
  ];

  const pieDataMonth = [
    { name: "Total Order", value: 400, color: "#219EBC" },
    { name: "Order Cancel", value: 100, color: "#FF595E" },
    { name: "Total Order Again", value: 300, color: "#FEC53D" },
  ];

  const pieData = viewMode === "today" ? pieDataToday : pieDataMonth;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-screen bg-slate-100 py-6 px-8'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button onClick={handleBack}>
            {" "}
            <ArrowLeft size={26} />
          </button>
          <h1 className='text-3xl font-bold '>Dishes Analytics</h1>
        </div>
        <select className='border border-gray-300 rounded-lg p-2'>
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </select>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='relative w-full h-40 bg-gradient-to-t from-[#72b0b5] to-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-4 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3 text-gray-700'>
                    <div className='bg-white/70 p-2 rounded-full'>
                      <Package className='text-[#3CBAC6] w-6 h-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Dishes</p>
                      <h2 className='text-2xl font-bold text-gray-800'>
                        500,874
                      </h2>
                    </div>
                  </div>
                  <p className='text-emerald-600 font-semibold text-sm'>
                    +1,400 New Added
                  </p>
                </div>
              </div>
              <svg
                className='absolute bottom-0 left-0 w-full z-0'
                viewBox='0 0 500 50'
                preserveAspectRatio='none'>
                <path
                  d='M0,20 C150,60 350,-20 500,20 L500,50 L0,50 Z'
                  fill='#3CBAC6'
                  opacity='0.2'
                />
              </svg>
            </div>

            <div className='relative w-full h-40 bg-gradient-to-t from-yellow-400 to-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-4 relative z-10'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3 text-gray-700'>
                    <div className='bg-white p-2 rounded-full'>
                      <Package className='text-yellow-500 w-6 h-6' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Orders</p>
                      <h2 className='text-2xl font-bold text-gray-800'>
                        234,888
                      </h2>
                    </div>
                  </div>
                  <p className='text-green-600 font-semibold text-sm'>
                    +1,000 Orders Today
                  </p>
                </div>
              </div>
              <svg
                className='absolute bottom-0 left-0 w-full z-0'
                viewBox='0 0 500 50'
                preserveAspectRatio='none'>
                <path
                  d='M0,20 C150,60 350,-20 500,20 L500,50 L0,50 Z'
                  fill='#FACC15'
                  opacity='0.2'
                />
              </svg>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-md'>
            <h2 className='font-semibold text-lg mb-4'>
              Top 10 Selling Dishes
            </h2>
            <table className='w-full text-sm'>
              <thead className='text-left text-gray-500 bg-gray-50'>
                <tr>
                  <th className='py-2 text-center'>Top</th>
                  <th className='py-2 px-3'>Dish</th>
                  <th className='py-2 px-3 '>Restaurant</th>
                  <th className='py-2 px-3'>Price</th>
                  <th className='py-2 px-3 text-center'>Total Orders</th>
                  <th className='py-2 px-3'>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {top10SellingDishes.map((dish, index) => {
                  const totalSales = dish.price * dish.total_orders;
                  const formattedSales = totalSales.toLocaleString() + "đ";
                  const isTop3 = index < 3;
                  const rowBg = index % 2 === 0 ? "bg-gray-50" : "bg-white";

                  return (
                    <tr
                      key={dish._id}
                      className={`${rowBg} border-t hover:bg-gray-100`}>
                      <td className='py-3 px-3 text-center'>
                        {isTop3 ? (
                          <span
                            title={`Top ${index + 1}`}
                            className='text-yellow-400 text-lg'>
                            🏅
                          </span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className='py-3 px-3'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={dish.image}
                            className='w-10 h-10 rounded-full object-cover'
                            alt={dish.name}
                          />
                          <span className='font-medium text-gray-800'>
                            {dish.name}
                          </span>
                        </div>
                      </td>
                      <td className='py-3 px-3 text-gray-600'>
                        {dish.restaurant_id.name}
                      </td>
                      <td className='py-3 px-3 text-gray-700'>
                        {dish.price.toLocaleString()}đ
                      </td>
                      <td className='py-3 px-3 text-gray-700 text-center'>
                        {dish.total_orders.toLocaleString()}
                      </td>
                      <td className='py-3 px-3 font-semibold text-left text-cyan-500'>
                        {formattedSales}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='bg-white rounded-xl p-6 shadow-md'>
            <h2 className='font-semibold text-lg mb-4'>
              Selling Dishes by Month
            </h2>
            {dataSellingMonth.map((entry, index) => (
              <div key={index} className='mb-3'>
                <div className='flex justify-between text-sm mb-1'>
                  <span>{entry.name}</span>
                  <span>{entry.value.toLocaleString()}</span>
                </div>
                <div className='w-full h-4 bg-gray-200 rounded-full'>
                  <div
                    className='h-4 rounded-full'
                    style={{
                      width: `${(entry.value / 30000) * 100}%`,
                      backgroundColor: index % 2 === 0 ? "#FEC53D" : "#219EBC",
                    }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl p-6 shadow-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='font-semibold text-lg'>Product Sales Analytics</h2>
              <div className='flex gap-2 text-sm'>
                <button
                  onClick={() => setViewMode("today")}
                  className={`px-3 py-1 text-lg rounded ${
                    viewMode === "today"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100"
                  }`}>
                  Today
                </button>

                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-1 rounded text-lg ${
                    viewMode === "month"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100"
                  }`}>
                  This Month
                </button>
              </div>
            </div>
            <ResponsiveContainer width='100%' height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} units`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className='grid grid-cols-2 gap-2 text-xs mt-4 px-2'>
              {pieData.map((entry, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <span
                    className='w-3 h-3 rounded-full'
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
