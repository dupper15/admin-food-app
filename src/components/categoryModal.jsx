const CategoryModal = ({ setShowCategoryModal }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md w-96 relative'>
        <h2 className='text-xl font-semibold mb-4'>Add New Category</h2>
        <div className='mb-3'>
          <label className='block mb-1 text-sm'>Category Name</label>
          <input
            type='text'
            placeholder='Enter name'
            className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm'>Image URL</label>
          <input
            type='text'
            placeholder='Paste image URL...'
            className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
        </div>
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setShowCategoryModal(false)}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'>
            Cancel
          </button>
          <button
            onClick={() => {
              setShowCategoryModal(false);
            }}
            className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
