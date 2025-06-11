import { useMutation } from "@tanstack/react-query";
import { deleteTopping } from "../services/toppingService";

const ToppingComponent = ({ topping, onDelete }) => {
  const deleteToppingMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteTopping(id);
    },
    onSuccess: (data) => {
      onDelete?.(topping._id);
    },
    onError: (error) => {
      console.error("Delete topping failed:", error);
    },
  });

  const handleDeleteTopping = (topping) => {
    deleteToppingMutation.mutate(topping._id);
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <h4 className="text-base font-medium">{topping.name}</h4>
      <div className="flex items-center justify-between mt-2">
        <p className="text-yellow-500 font-semibold text-sm mt-1">
          {topping.price.toLocaleString()}đ
        </p>
        <button
          onClick={() => handleDeleteTopping(topping)}
          className="bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default ToppingComponent;
