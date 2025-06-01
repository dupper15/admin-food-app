import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../services/categoryService";
import { useState } from "react";

const CategoryModal = ({ setShowCategoryModal, refresh, setRefresh }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createCategoryMutation = useMutation({
    mutationFn: async ({ name, imageUrl }) => {
      return await createCategory({ name, imageUrl });
    },
    onSuccess: (data) => {
      setRefresh(!refresh);
      setIsLoading(false);
      setName("");
      setImageUrl("");
      setShowCategoryModal(false);
      console.log("Create category success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Create category failed:", error);
      alert(error.response.data.message);
    },
  });

  const handleCreate = () => {
    setIsLoading(true);
    createCategoryMutation.mutate({ name, imageUrl });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowCategoryModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className={`px-4 py-2 rounded text-white ${
              isLoading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
