import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RatingComponent from "./../components/ratingComponent";
import DishComponent from "./../components/dishComponent";
import ToppingComponent from "../components/toppingComponent";
import { useMutation } from "@tanstack/react-query";
import { fetchDetailRestaurant } from "../services/restaurantService";
import { averageRating, getAllByRestaurant } from "../services/ratingService";
import { fetchAll } from "../services/categoryService";
import { fetchAllDishByRestaurant } from "../services/dishService";
import { getAllToppingByRestaurant } from "../services/toppingService";
const RestaurantDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [restaurant, setRestaurant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [filterDishes, setFilterDishes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [ratings, setRatings] = useState([]);

  const getDetailsRestaurant = useMutation({
    mutationFn: async (id) => {
      return await fetchDetailRestaurant(id);
    },
    onSuccess: (data) => {
      setRestaurant(data);
      setIsLoading(false);
      console.log("Fetch restaurant success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch restaurant failed:", error);
    },
  });

  const getAverageRating = useMutation({
    mutationFn: async (id) => {
      return await averageRating(id);
    },
    onSuccess: (data) => {
      setAverage(data);
      setIsLoading(false);
      console.log("Fetch restaurant success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch restaurant failed:", error);
    },
  });

  const fetchAllCategory = useMutation({
    mutationFn: async () => {
      return await fetchAll();
    },
    onSuccess: (data) => {
      const allCategory = {
        _id: "all",
        name: "All",
        isDeleted: false,
        image: "",
      };
      const updatedCategories = [allCategory, ...data];
      setCategories(updatedCategories);
      console.log("Fetch all categories success:", data);
    },
    onError: (error) => {
      console.error("Fetch all categories failed:", error);
    },
  });

  const fetchAllDish = useMutation({
    mutationFn: async (id) => {
      return await fetchAllDishByRestaurant(id);
    },
    onSuccess: (data) => {
      setDishes(data);
      setFilterDishes(data); // <== thêm dòng này
      setSelectedCategory({
        _id: "all",
        name: "All",
        isDeleted: false,
        image: "",
      });
      console.log("Fetch all dishes success:", data);
    },
    onError: (error) => {
      console.error("Fetch all dishes failed:", error);
    },
  });

  const getAllTopping = useMutation({
    mutationFn: async (id) => {
      return await getAllToppingByRestaurant(id);
    },
    onSuccess: (data) => {
      setToppings(data);
      setIsLoading(false);
      console.log("Fetch toppings success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch toppings failed:", error);
    },
  });

  const getAllRating = useMutation({
    mutationFn: async (id) => {
      return await getAllByRestaurant(id);
    },
    onSuccess: (data) => {
      setRatings(data);
      setIsLoading(false);
      console.log("Fetch ratings success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch ratings failed:", error);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getDetailsRestaurant.mutate(id);
    getAverageRating.mutate(id);
    fetchAllCategory.mutate();
    fetchAllDish.mutate(id);
    getAllTopping.mutate(id);
    getAllRating.mutate(id);
  }, [id]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === restaurant?.banners.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === 0 ? restaurant?.banners.length - 1 : prev - 1
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory?._id === "all") {
      setFilterDishes(dishes);
    } else {
      const filtered = dishes.filter(
        (dish) => dish?.category_id === selectedCategory._id
      );
      setFilterDishes(filtered);
    }
  }, [selectedCategory]);

  const handleDeleteDish = (id) => {
    setFilterDishes((prev) => prev.filter((dish) => dish._id !== id));
  };

  const handleDeleteTopping = (id) => {
    setToppings((prev) => prev.filter((topping) => topping._id !== id));
  };

  const handleDeleteRating = (id) => {
    setRatings((prev) => prev.filter((rating) => rating._id !== id));
  };

  const handleUpdateReply = (id, updatedReplies) => {
    setRatings((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, replies_array: updatedReplies } : r
      )
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen text-black px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 ">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow hover:bg-yellow-100 transition"
          >
            <ArrowLeft size={18} className="text-yellow-500" />
            <span>Back</span>
          </button>
        </div>
        <div className="relative w-full h-[250px] sm:h-[400px] mt-6 rounded-xl overflow-hidden shadow">
          <img
            src={restaurant?.banners[currentBannerIndex]}
            alt={`Banner ${currentBannerIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handlePrevBanner}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNextBanner}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow rotate-180"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            {restaurant?.name}
            <span className="text-yellow-500 text-lg font-medium">
              ⭐ {average.toFixed(1)}
            </span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">{restaurant?.address}</p>
          <p className="mt-2 text-base text-gray-700">
            {restaurant?.description}
          </p>
        </div>

        <div className="mt-8 flex gap-3 flex-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg border transition ${
                cat._id === selectedCategory?._id
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 hover:bg-yellow-100 border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            Menu ({filterDishes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterDishes.map((dish, i) => (
              <DishComponent key={i} dish={dish} onDelete={handleDeleteDish} />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">
            Toppings ({toppings.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {toppings.map((topping) => (
              <ToppingComponent
                topping={topping}
                onDelete={handleDeleteTopping}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Feedback</h3>
          <div className="space-y-6">
            {ratings.map((fb, i) => (
              <RatingComponent
                key={i}
                fb={fb}
                onDelete={handleDeleteRating}
                onUpdate={handleUpdateReply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
