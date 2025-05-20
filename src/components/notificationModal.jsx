const NotificationModal = ({ setOpenNotificationModal }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl p-6 w-full max-w-md shadow'>
        <h3 className='text-xl font-bold text-yellow-500 mb-4'>
          Create New Notification
        </h3>
        <input
          type='text'
          placeholder='Title'
          className='w-full mb-2 px-3 py-2 border rounded text-black'
        />
        <textarea
          placeholder='Message content'
          className='w-full h-24 mb-4 px-3 py-2 border rounded text-black'
        />
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setOpenNotificationModal(false)}
            className='px-4 py-1 border rounded text-black'>
            Cancel
          </button>
          <button
            onClick={() => {
              setOpenNotificationModal(false);
            }}
            className='px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
