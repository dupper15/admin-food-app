const ToppingComponent = ({ topping }) => {
  const handleRemove = () => {
    console.log(`Removing ${topping.name} from cart`);
  };
  return (
    <div className='bg-white p-4 rounded-xl shadow hover:shadow-md transition'>
      <h4 className='text-base font-medium'>{topping.name}</h4>
      <div className='flex items-center justify-between mt-2'>
        <p className='text-yellow-500 font-semibold text-sm mt-1'>
          {topping.price.toLocaleString()}đ
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
export default ToppingComponent;
