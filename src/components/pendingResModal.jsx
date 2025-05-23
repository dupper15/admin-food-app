import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PendingResModal = ({ restaurants, setShowPending }) => {
  const handleApprove = (id) => {
    console.log("Approved:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected:", id);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-xl shadow-lg'>
        <button
          onClick={() => setShowPending(false)}
          className='absolute top-4 right-4 text-gray-500 hover:text-black'>
          <X size={24} />
        </button>

        <h2 className='text-xl font-semibold mb-4 text-yellow-700'>
          Pending restaurant list
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {restaurants.map((res) => (
            <Card
              key={res._id}
              res={res}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Component riêng cho mỗi card
const Card = ({ res, onApprove, onReject }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const totalBanners = res.banners?.length || 0;

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % totalBanners);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  return (
    <div className='border rounded-lg shadow-sm p-4 flex flex-col gap-3'>
      {totalBanners > 0 && (
        <div className='relative w-full h-32 rounded-md overflow-hidden'>
          <img
            src={res.banners[currentBanner]}
            alt={`banner-${currentBanner}`}
            className='w-full h-full object-cover'
          />
          {totalBanners > 1 && (
            <>
              <button
                onClick={prevBanner}
                className='absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 shadow'>
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextBanner}
                className='absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 shadow'>
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}

      <div className='flex items-center gap-3'>
        <img
          src={res.owner_id.avatar}
          alt='avatar'
          className='w-10 h-10 rounded-full border'
        />
        <div>
          <h3 className='font-bold text-lg'>{res.name}</h3>
          <p className='text-gray-600 text-sm'>{res.address}</p>
        </div>
      </div>

      <div className='text-sm text-gray-700'>
        <p>
          <strong>ID:</strong> {res._id}
        </p>
        <p>
          <strong>Đơn hàng:</strong> {res.total_orders}
        </p>
        <p>
          <strong>Đánh giá:</strong> {res.total_reviews}
        </p>
      </div>

      {/* Hành động */}
      <div className='flex justify-end gap-3 pt-2'>
        <button
          onClick={() => onApprove(res._id)}
          className='text-green-600 hover:text-green-800'
          title='Duyệt'>
          <CheckCircle size={22} />
        </button>
        <button
          onClick={() => onReject(res._id)}
          className='text-red-600 hover:text-red-800'
          title='Từ chối'>
          <XCircle size={22} />
        </button>
      </div>
    </div>
  );
};

export default PendingResModal;
