const RatingComponent = ({ fb }) => {
  const handleRemoveRating = () => {
    console.log("test");
  };
  const handleRemoveReply = () => {
    console.log("test");
  };
  return (
    <div className='bg-white p-5 rounded-2xl shadow space-y-3'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 text-base font-medium'>
          <span>{fb.user}</span>
          <span className='text-yellow-500'>{"⭐".repeat(fb.rating)}</span>
        </div>
        <button
          onClick={handleRemoveRating}
          className='bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition'>
          Remove
        </button>
      </div>
      <p className='text-sm text-gray-700'>{fb.content}</p>

      {fb.images.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {fb.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt='Feedback Dish'
              className='w-16 h-16 object-cover rounded-md'
            />
          ))}
        </div>
      )}

      <div className='mt-3 ml-4 border-l-4 border-yellow-400 pl-4 pb-2 bg-yellow-50 rounded-md'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-yellow-600'>{fb.reply.user}:</p>
          <button
            onClick={handleRemoveReply}
            className='bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 mt-2 mr-2 rounded-full border border-red-200 hover:bg-red-100 transition'>
            Remove
          </button>
        </div>
        <p className='text-sm text-gray-700'>{fb.reply.content}</p>
        <div className='flex gap-2 mt-2  flex-wrap'>
          {fb.reply.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt='Reply'
              className='w-12 h-12 object-cover rounded'
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RatingComponent;
