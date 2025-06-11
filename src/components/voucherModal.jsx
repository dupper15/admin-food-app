import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createVoucher } from "../services/voucherService";

const VoucherModal = ({ setOpenVoucherModal, refresh, setRefresh }) => {
  const [formData, setFormData] = useState({
    promotionName: "",
    quantity: "",
    value: "",
    minOrderAmount: "",
    maxDiscountValue: "",
    startDate: "",
    endDate: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createVoucherMutation = useMutation({
    mutationFn: async (data) => await createVoucher(data),
    onSuccess: (data) => {
      console.log("Create voucher success:", data);
      handleCancel(); // reset form + đóng modal
    },
    onError: (error) => {
      console.error("Create voucher failed:", error);
    },
  });

  const handleCreate = () => {
    createVoucherMutation.mutate({
      restaurant_id: null,
      name: formData.promotionName,
      quantity: Number(formData.quantity),
      value: Number(formData.value),
      min: Number(formData.minOrderAmount),
      max: Number(formData.maxDiscountValue),
      start_date: formData.startDate,
      expire_date: formData.endDate,
      content: formData.content,
    });
  };

  const handleCancel = () => {
    setFormData({
      promotionName: "",
      quantity: "",
      value: "",
      minOrderAmount: "",
      maxDiscountValue: "",
      startDate: "",
      endDate: "",
      content: "",
    });
    setRefresh(!refresh);
    setOpenVoucherModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow space-y-4">
        <h3 className="text-xl font-bold text-yellow-500 mb-2">
          Create New Voucher
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Promotion Name</label>
            <input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Value (% or fixed)
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Minimum Order Amount
            </label>
            <input
              type="number"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Max Discount Value
            </label>
            <input
              type="number"
              name="maxDiscountValue"
              value={formData.maxDiscountValue}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-black"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full h-24 px-3 py-2 border rounded text-black"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-1 border rounded text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
