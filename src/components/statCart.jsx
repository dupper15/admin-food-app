import React from "react";
import { User, Utensils, ShoppingBag, DollarSign } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm w-full max-w-[240px]'>
    <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
    <div>
      <div className='text-xl font-semibold text-gray-900'>{value}</div>
      <div className='text-sm text-gray-500'>{label}</div>
    </div>
  </div>
);

const DashboardStats = () => {
  return (
    <div className='flex flex-nowrap gap-6 overflow-x-auto w-full justify-between'>
      <StatCard
        icon={User}
        value='178+'
        label='Users'
        color='text-purple-500'
      />
      <StatCard
        icon={Utensils}
        value='20+'
        label='Restaurants'
        color='text-teal-600'
      />
      <StatCard
        icon={ShoppingBag}
        value='190+'
        label='Order Foods'
        color='text-pink-500'
      />
      <StatCard
        icon={DollarSign}
        value='+ 10.000.000'
        label='Revenue'
        color='text-purple-500'
      />
    </div>
  );
};

export default DashboardStats;
