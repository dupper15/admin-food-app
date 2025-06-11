const RestaurantDetailModal = ({ data, setShow }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
          onClick={() => setShow(false)}
        >
          &times;
        </button>

        {data.owner_id?.avatar && (
          <div className="flex justify-center mb-4">
            <img
              src={data.owner_id.avatar}
              alt="Restaurant Owner"
              className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
          Restaurant Detail
        </h2>

        <div className="space-y-3">
          <Info label="Name" value={data.name} />
          <Info label="Address" value={data.address} />
          <Info label="Total Orders" value={data.total_orders} />
          <Info label="Total Reviews" value={data.total_reviews} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm text-gray-800 border-b pb-1">
    <span className="font-medium w-1/2">{label}:</span>
    <span className="text-right w-1/2">
      {typeof value === "string" || typeof value === "number"
        ? value
        : value || "N/A"}
    </span>
  </div>
);

export default RestaurantDetailModal;
