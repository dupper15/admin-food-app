import DashboardCharts from "../components/dashboardCharts";
import DashboardStats from "../components/statCart";
import TopRestaurant from "../components/topRestaurant";
import TopUser from "../components/topUser";

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6 h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4 text-left'>
        Dashboard
      </h1>

      <div className='space-y-6 overflow-auto flex-grow '>
        <DashboardStats />
        <DashboardCharts />
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 h-full'>
            <TopRestaurant />
          </div>
          <div className='col-span-1 h-full'>
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
