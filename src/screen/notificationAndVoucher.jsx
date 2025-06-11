import React, { useEffect, useState } from "react";
import CategoryModal from "../components/categoryModal";
import VoucherModal from "../components/voucherModal";
import NotificationModal from "../components/notificationModal";
import { useMutation } from "@tanstack/react-query";
import { fetchAllCategory } from "../services/categoryService";
import { getAllVoucher } from "../services/voucherService";

const NotificationAndVoucher = () => {
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getAllCategory = useMutation({
    mutationFn: async () => {
      return await fetchAllCategory();
    },
    onSuccess: (data) => {
      setCategories(data);
      console.log("Fetch category success:", data);
    },
    onError: (error) => {
      console.error("Fetch category failed:", error);
    },
  });

  const getAllVoucherMutation = useMutation({
    mutationFn: async () => {
      return await getAllVoucher();
    },
    onSuccess: (data) => {
      setVouchers(data);
      console.log("Fetch voucher success:", data);
    },
    onError: (error) => {
      console.error("Fetch voucher failed:", error);
    },
  });

  useEffect(() => {
    getAllCategory.mutate();
    getAllVoucherMutation.mutate();
  }, [refresh]);

  const notificationData = [
    {
      _id: 1,
      title: "Thông báo",
      content: "Đã có phản hồi mới từ khách hàng.",
      create_at: "2025-05-15T10:12:00Z",
      isSeen: false,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 text-gray-900">
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">
            Categories ({categories.length})
          </h3>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded shadow transition"
          >
            + Add Category
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl p-4 shadow flex flex-col items-center"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 rounded-full object-cover mb-3"
              />
              <div className="text-center">
                <p className="font-semibold">{cat.name}</p>
                <p className="text-gray-500 text-xs">{cat.dishCount} dishes</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Vouchers</h2>
          <button
            onClick={() => setOpenVoucherModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded shadow transition"
          >
            + Add Voucher
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {vouchers.map((v) => (
            <div key={v._id} className="bg-white rounded-xl p-5 shadow-md">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="font-semibold">
                  {v.name} ({v.code})
                </span>
                <span>
                  {new Date(v.start_date).toLocaleDateString()} -{" "}
                  {new Date(v.expire_date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{v.content}</p>
              <div className="text-sm mt-2 space-y-1">
                <div>
                  <span className="text-yellow-600 font-semibold">
                    Số lượng:
                  </span>{" "}
                  {v.quantity}
                </div>
                <div>
                  <span className="text-yellow-600 font-semibold">
                    Giá trị:
                  </span>{" "}
                  {v.value >= 1 ? `${v.value} đ` : `${v.value * 100}%`}
                </div>
                <div>
                  <span className="text-yellow-600 font-semibold">
                    Tối thiểu:
                  </span>{" "}
                  {v.min | 0} đ
                </div>
                <div>
                  <span className="text-yellow-600 font-semibold">Tối đa:</span>{" "}
                  {v.max | 0} đ
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button
            onClick={() => setOpenNotificationModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded shadow transition"
          >
            Send Notification
          </button>
        </div>
      </section>

      {showCategoryModal && (
        <CategoryModal
          setShowCategoryModal={setShowCategoryModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {openNotificationModal && (
        <NotificationModal
          setOpenNotificationModal={setOpenNotificationModal}
        />
      )}
      {openVoucherModal && (
        <VoucherModal
          setOpenVoucherModal={setOpenVoucherModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default NotificationAndVoucher;
