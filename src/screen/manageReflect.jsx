import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const reflects = [
  {
    _id: "1",
    customer_id: {
      _id: "1",
      name: "Khách hàng 1",
      email: "customer1@example.com",
    },
    content: "Dịch vụ tốt, sẽ quay lại!",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=500&q=80",
    ],
    replies_array: ["Cảm ơn bạn đã ủng hộ!"],
    restaurant_id: "abcd1234efgh5678ijkl9012",
    create_at: new Date("2025-05-15T10:12:00Z"),
  },
  {
    _id: "2",
    customer_id: {
      _id: "2",
      name: "Khách hàng 2",
      email: "customer2@example.com",
    },
    content: "Không hài lòng với món ăn.",
    images: [],
    replies_array: ["Chúng tôi sẽ cải thiện. Cảm ơn góp ý!"],
    restaurant_id: null,
    create_at: new Date("2025-05-16T14:25:30Z"),
  },
  {
    _id: "3",
    customer_id: {
      _id: "3",
      name: "Khách hàng 3",
      email: "customer3@example.com",
    },
    content: "Quán khá ổn, nhưng phục vụ hơi chậm.",
    images: [
      "https://images.unsplash.com/photo-1589927986089-35812388d1b3?fit=crop&w=500&q=80",
    ],
    replies_array: [],
    restaurant_id: "abcd1234efgh5678ijkl9012",
    create_at: new Date("2025-05-14T09:40:10Z"),
  },
  {
    _id: "4",
    customer_id: {
      _id: "4",
      name: "Khách hàng 4",
      email: "customer4@example.com",
    },
    content: "Không gian đẹp, rất chill!",
    images: [
      "https://images.unsplash.com/photo-1610878180933-fce9c1c4a8b3?fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1596496055964-7b3e5f4dba29?fit=crop&w=500&q=80",
    ],
    replies_array: ["Mong được gặp bạn lần sau!"],
    restaurant_id: null,
    create_at: new Date("2025-05-17T16:00:00Z"),
  },
  {
    _id: "5",
    customer_id: {
      _id: "345435",
      name: "Nguyễn Văn A",
      email: "ng@gmail.com",
    },
    content: "Giá cả hợp lý, món ăn ngon!",
    images: [],
    replies_array: [],
    restaurant_id: "xyz98765lmn43210tuv6543",
    create_at: new Date("2025-05-18T19:30:00Z"),
  },
];

const ManageReflect = () => {
  const [replies, setReplies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2;

  const filteredReflects = reflects
    .filter((item) => {
      if (filter === "replied") return item.replies_array.length > 0;
      if (filter === "unreplied") return item.replies_array.length === 0;
      return true;
    })
    .filter((item) => {
      const name = item.customer_id.name.toLowerCase();
      const email = item.customer_id.email.toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term) || email.includes(term);
    });

  const totalPages = Math.ceil(filteredReflects.length / itemsPerPage);

  const currentItems = filteredReflects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (id) => {
    alert(`Reply for Reflect ${id}: ${replies[id] || ""}`);
    setReplies((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className='p-6 space-y-6 h-full bg-slate-100'>
      <h2 className='text-2xl font-bold'>Customer Feedback</h2>
      <div className='relative w-64'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
          <FaSearch />
        </span>
        <input
          type='text'
          placeholder='Search users...'
          className='bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex gap-4 mb-4'>
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}>
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "replied" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("replied");
            setCurrentPage(1);
          }}>
          Replied
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "unreplied" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("unreplied");
            setCurrentPage(1);
          }}>
          Unreplied
        </button>
      </div>

      {currentItems.map((reflect) => (
        <div
          key={reflect._id}
          className={`border p-4 rounded-xl shadow-sm transition ${
            reflect.replies_array.length === 0
              ? "bg-red-50 border-red-300"
              : "bg-white"
          }`}>
          <div className='flex justify-between items-center mb-2'>
            <div className='text-sm text-gray-600'>
              Customer: {reflect.customer_id.name} ({reflect.customer_id._id}) |{" "}
              {new Date(reflect.create_at).toLocaleString()}
            </div>
            {reflect.restaurant_id && (
              <a
                href={`/main/restaurant/${reflect.restaurant_id}`}
                className='text-yellow-500 underline text-sm'>
                View restaurant
              </a>
            )}
          </div>
          <p className='text-gray-800 mb-2'>{reflect.content}</p>
          {reflect.images.length > 0 && (
            <div className='flex gap-2 mb-2'>
              {reflect.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt='feedback-img'
                  className='w-24 h-24 object-cover rounded'
                />
              ))}
            </div>
          )}
          {reflect.replies_array.length > 0 && (
            <div className='text-sm text-green-600 mb-2'>
              <strong>Replies:</strong>
              <ul className='list-disc ml-6'>
                {reflect.replies_array.map((reply, idx) => (
                  <li key={idx}>{reply}</li>
                ))}
              </ul>
            </div>
          )}
          <div className='flex gap-2 mt-2'>
            <input
              type='text'
              placeholder='Enter your reply...'
              value={replies[reflect._id] || ""}
              onChange={(e) => handleReplyChange(reflect._id, e.target.value)}
              className='flex-1 border rounded px-3 py-1'
            />
            <button
              onClick={() => handleSendReply(reflect._id)}
              className='bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-700'>
              Send
            </button>
          </div>
        </div>
      ))}
      <div className='flex justify-center mt-8'>
        <div className='flex items-center gap-2'>
          <button
            className='px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition'
            onClick={() => () => setCurrentPage((p) => Math.max(1, p - 1))}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded font-medium transition ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-white border border-yellow-500 text-yellow-600 hover:bg-yellow-100"
              }`}>
              {i + 1}
            </button>
          ))}
          <button
            className='px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition'
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageReflect;
