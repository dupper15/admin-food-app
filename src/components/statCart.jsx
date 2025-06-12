import React, { useEffect, useState } from "react";
import { User, Utensils, ShoppingBag, DollarSign } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchAll } from "../services/dashboardService";

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm w-full max-w-[240px]">
    <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
    <div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm w-full max-w-[240px] animate-pulse">
    <div className="p-3 rounded-full bg-gray-200 bg-opacity-50 h-10 w-10" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const DashboardStats = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getAll = useMutation({
    mutationFn: async () => {
      return await fetchAll();
    },
    onSuccess: (data) => {
      setData(data);
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
    getAll.mutate();
  }, []);

  return (
    <div className="flex flex-nowrap gap-6 overflow-x-auto w-full justify-between">
      {isLoading ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        <>
          <StatCard
            icon={User}
            value={data?.totalUsers ?? 0}
            label="Users"
            color="text-purple-500"
          />
          <StatCard
            icon={Utensils}
            value={data?.totalRestaurants ?? 0}
            label="Restaurants"
            color="text-teal-600"
          />
          <StatCard
            icon={ShoppingBag}
            value={data?.totalOrders ?? 0}
            label="Order Foods"
            color="text-pink-500"
          />
          <StatCard
            icon={DollarSign}
            value={`+ ${data?.totalRevenue?.toLocaleString() ?? 0}`}
            label="Revenue"
            color="text-purple-500"
          />
        </>
      )}
    </div>
  );
};

export default DashboardStats;
