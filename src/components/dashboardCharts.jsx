import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "1", orders: 270, cancel: 130, complete: 140 },
  { month: "2", orders: 310, cancel: 90, complete: 220 },
  { month: "3", orders: 250, cancel: 50, complete: 200 },
  { month: "4", orders: 200, cancel: 60, complete: 140 },
  { month: "5", orders: 320, cancel: 80, complete: 240 },
  { month: "6", orders: 280, cancel: 70, complete: 210 },
  { month: "7", orders: 300, cancel: 100, complete: 200 },
  { month: "8", orders: 260, cancel: 60, complete: 200 },
  { month: "9", orders: 290, cancel: 90, complete: 200 },
  { month: "10", orders: 310, cancel: 70, complete: 240 },
  { month: "11", orders: 330, cancel: 60, complete: 270 },
  { month: "12", orders: 300, cancel: 50, complete: 250 },
];

const totalComplete = monthlyData.reduce((sum, item) => sum + item.complete, 0);
const totalCancel = monthlyData.reduce((sum, item) => sum + item.cancel, 0);

const pieData = [
  { name: "Completed", value: totalComplete },
  { name: "Canceled", value: totalCancel },
];

const COLORS = ["#2db58c", "#f14d4d"];

const DashboardCharts = () => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      <div className='bg-white rounded-xl p-4 shadow-sm col-span-2'>
        <h2 className='font-semibold text-lg mb-4'>Monthly Orders Report</h2>
        <ResponsiveContainer width='100%' height={250}>
          <AreaChart
            data={monthlyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id='colorOrders' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#34d399' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#60a5fa' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey='month' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='orders'
              stroke='#4f46e5'
              fillOpacity={1}
              fill='url(#colorOrders)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white  rounded-xl relative p-4 shadow-sm flex flex-col items-center justify-center col-span-1'>
        <h2 className='font-semibold text-lg mb-4'>Order Analytics</h2>
        <a
          href='/dishes-analytics'
          className='text-sm text-blue-500 hover:text-blue-700 underline absolute top-4 right-4'>
          See more
        </a>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              dataKey='value'
              labelLine={false}>
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          <p className='text-2xl font-bold text-gray-800'>
            {Math.round((totalComplete / (totalComplete + totalCancel)) * 100)}%
          </p>
          <p className='text-sm text-gray-500'>Completed</p>
        </div>
        <div className='flex gap-4 mt-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-[#2db58c]'></div>
            <span className='text-sm text-gray-700'>Completed</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-[#f14d4d]'></div>
            <span className='text-sm text-gray-700'>Canceled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
