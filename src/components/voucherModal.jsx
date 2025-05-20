const VoucherModal = ({ setOpenVoucherModal }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl p-6 w-full max-w-xl shadow space-y-4'>
        <h3 className='text-xl font-bold text-yellow-500 mb-2'>
          Create New Voucher
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>Voucher Code</label>
            <input
              type='text'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>Promotion Name</label>
            <input
              type='text'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>Quantity</label>
            <input
              type='number'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>
              Value (% or fixed amount)
            </label>
            <input
              type='number'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>
              Minimum Order Amount
            </label>
            <input
              type='number'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>
              Max Discount Value (if using %)
            </label>
            <input
              type='number'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>Start Date</label>
            <input
              type='date'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-700 mb-1'>End Date</label>
            <input
              type='date'
              className='border rounded px-3 py-2 text-black'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-700 mb-1'>Description</label>
          <textarea className='w-full h-24 px-3 py-2 border rounded text-black' />
        </div>
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setOpenVoucherModal(false)}
            className='px-4 py-1 border rounded text-black'>
            Cancel
          </button>
          <button
            onClick={() => {
              setOpenVoucherModal(false);
            }}
            className='px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600'>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
