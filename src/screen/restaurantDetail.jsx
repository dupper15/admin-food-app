import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RatingComponent from "./../components/ratingComponent";
import DishComponent from "./../components/dishComponent";
import ToppingComponent from "../components/toppingComponent";
const RestaurantDetail = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === restaurant.banner.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === 0 ? restaurant.banner.length - 1 : prev - 1
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const [filterDishes, setFilterDishes] = useState([]);
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilterDishes(dishes);
    } else {
      const filtered = dishes.filter(
        (dish) => dish.category_id.name === selectedCategory
      );
      setFilterDishes(filtered);
    }
  }, [selectedCategory]);

  const restaurant = {
    name: "Andree Restaurant",
    address: "KTX Khu A, Đại học quốc gia Thành Phố HCM",
    rating: 4.7,
    description: `Lorem Ipsum is simply dummy text...`,
    banner: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?fit=crop&w=1400&q=80",
      "https://th.bing.com/th/id/OIP.-pauZyYt_nAyfr15EKG8hQHaE8?rs=1&pid=ImgDetMain",
    ],
  };

  const dishes = [
    {
      name: "Thịt heo chiên xù sốt chua ngọt",
      price: 40000,
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?fit=crop&w=500&q=80",
      category_id: {
        _id: "243234",
        name: "Noodle",
      },
    },
    {
      name: "Thịt heo chiên xù sốt chua ngọt",
      price: 40000,
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?fit=crop&w=500&q=80",
      category_id: {
        _id: "243234",
        name: "Drink",
      },
    },
  ];

  const feedbacks = Array(3).fill({
    user: "Anne Jacob",
    date: "10/02/2025",
    rating: 5,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    images: dishes.slice(0, 3).map((d) => d.image),
    reply: {
      user: "Owner",
      content: "Cảm ơn bạn đã đánh giá!",
      images: dishes.slice(0, 2).map((d) => d.image),
    },
  });
  const toppings = [
    {
      _id: "67de302",
      restaurant_id: "67de302",
      name: "Tốp mỡ",
      price: 8000,
    },
    {
      _id: "67de303",
      restaurant_id: "67de302",
      name: "Trứng cút",
      price: 5000,
    },
    {
      _id: "67de304",
      restaurant_id: "67de302",
      name: "Phô mai",
      price: 10000,
    },
    {
      _id: "67de305",
      restaurant_id: "67de302",
      name: "Xúc xích",
      price: 12000,
    },
    {
      _id: "67de306",
      restaurant_id: "67de302",
      name: "Hành phi",
      price: 3000,
    },
    {
      _id: "67de307",
      restaurant_id: "67de302",
      name: "Chả lụa",
      price: 9000,
    },
  ];

  return (
    <div className='bg-slate-100 min-h-screen text-black px-4 py-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-4 '>
          <button
            onClick={handleBack}
            className='flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow hover:bg-yellow-100 transition'>
            <ArrowLeft size={18} className='text-yellow-500' />
            <span>Back</span>
          </button>
        </div>
        <div className='relative w-full h-[250px] sm:h-[400px] mt-6 rounded-xl overflow-hidden shadow'>
          <img
            src={restaurant.banner[currentBannerIndex]}
            alt={`Banner ${currentBannerIndex + 1}`}
            className='w-full h-full object-cover'
          />
          <button
            onClick={handlePrevBanner}
            className='absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow'>
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNextBanner}
            className='absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow rotate-180'>
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className='mt-6'>
          <h2 className='text-3xl font-bold flex items-center gap-3'>
            {restaurant.name}
            <span className='text-yellow-500 text-lg font-medium'>
              ⭐ {restaurant.rating}
            </span>
          </h2>
          <p className='text-sm text-gray-600 mt-1'>{restaurant.address}</p>
          <p className='mt-2 text-base text-gray-700'>
            {restaurant.description}
          </p>
        </div>

        <div className='mt-8 flex gap-3 flex-wrap'>
          {["All", "Hot", "Drink", "Noodle", "Another"].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                cat === selectedCategory
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 hover:bg-yellow-100 border-gray-300"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className='mt-10'>
          <h3 className='text-xl font-semibold mb-4'>Menu ({dishes.length})</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {filterDishes.map((dish, i) => (
              <DishComponent key={i} dish={dish} />
            ))}
          </div>
        </div>
        <div className='mt-12'>
          <h3 className='text-xl font-semibold mb-4'>
            Toppings ({toppings.length})
          </h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {toppings.map((topping) => (
              <ToppingComponent topping={topping} />
            ))}
          </div>
        </div>

        <div className='mt-12'>
          <h3 className='text-xl font-semibold mb-6'>Feedback</h3>
          <div className='space-y-6'>
            {feedbacks.map((fb, i) => (
              <RatingComponent key={i} fb={fb} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
