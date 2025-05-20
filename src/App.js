import "./App.css";
import LoginScreen from "./screen/loginScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./screen/mainScreen.jsx";
import Home from "./screen/home.tsx";
import ManageUser from "./screen/manageUser.jsx";
import ManageRestaurant from "./screen/manageRestaurant.jsx";
import RestaurantDetail from "./screen/restaurantDetail.jsx";
import ManageReflect from "./screen/manageReflect.jsx";
import NotificationAndVoucher from "./screen/notificationAndVoucher.jsx";
import DishesAnalytics from "./screen/dishesAnalytics.jsx";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/main' element={<Layout />}>
            {/* <Route index element={<Navigate to='task' replace />} /> */}
            <Route path='home' element={<Home />} />
            <Route path='user' element={<ManageUser />} />
            <Route path='restaurant' element={<ManageRestaurant />} />
            <Route path='reflect' element={<ManageReflect />} />
            <Route
              path='notification_voucher'
              element={<NotificationAndVoucher />}
            />
          </Route>
          <Route path='/restaurant-detail' element={<RestaurantDetail />} />
          <Route path='/dishes-analytics' element={<DishesAnalytics />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
