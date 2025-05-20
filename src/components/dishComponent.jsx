const DishComponent = ({ dish }) => {
  const handleRemove = () => {
    console.log(`Removing ${dish.name} from cart`);
  };

  return (
    <div className='bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300'>
      <img
        src={dish.image}
        alt={dish.name}
        className='w-full h-40 object-cover rounded-xl'
      />
      <h4 className='mt-3 text-base font-semibold text-gray-800 line-clamp-2'>
        {dish.name}
      </h4>
      <div className='flex items-center justify-between mt-3'>
        <p className='text-yellow-500 font-bold text-sm'>
          {dish.price.toLocaleString()}đ
        </p>
        <button
          onClick={handleRemove}
          className='bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition'>
          Remove
        </button>
      </div>
    </div>
  );
};

export default DishComponent;
