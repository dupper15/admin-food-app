import { useMutation } from "@tanstack/react-query";
import { deleteRating } from "../services/ratingService";
import { deleteReply } from "../services/replyRatingService";

const RatingComponent = ({ fb, onDelete, onUpdate }) => {
  const deleteRatingMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteRating(id);
    },
    onSuccess: (data) => {
      onDelete?.(fb._id);
    },
    onError: (error) => {
      console.error("Delete rating failed:", error);
    },
  });

  const deleteReplyMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteReply(id);
    },
    onSuccess: (data) => {
      const updatedReplies = fb.replies_array.filter(
        (r) => r._id !== deleteReplyMutation.variables
      );
      onUpdate(fb._id, updatedReplies);
    },
    onError: (error) => {
      console.error("Delete rating failed:", error);
    },
  });

  const handleDeleteRating = (rating) => {
    deleteRatingMutation.mutate(rating._id);
  };

  const handleRemoveReply = (replyId) => {
    deleteReplyMutation.mutate(replyId);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow space-y-3">
      {/* Header: User + Rating + Remove button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-base font-medium">
          <img
            src={fb.customer_id?.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{fb.customer_id?.name || "Unknown"}</span>
          <span className="text-yellow-500">
            {"⭐".repeat(Math.round(fb.rating))}
          </span>
        </div>
        <button
          onClick={() => handleDeleteRating(fb)}
          className="bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition"
        >
          Remove
        </button>
      </div>

      {/* Feedback content */}
      <p className="text-sm text-gray-700">{fb.content}</p>

      {/* Feedback images */}
      {fb.image?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {fb.image.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Feedback Dish"
              className="w-16 h-16 object-cover rounded-md"
            />
          ))}
        </div>
      )}

      {/* Reply block */}
      {fb.replies_array?.length > 0 &&
        fb.replies_array.map((reply) => (
          <div
            key={reply._id}
            className="mt-3 ml-4 border-l-4 border-yellow-400 pl-4 pb-2 bg-yellow-50 rounded-md"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-yellow-600">Restaurant:</p>
              <button
                onClick={() => handleRemoveReply(reply._id)}
                className="bg-red-50 text-red-500 text-sm font-medium px-4 py-1.5 mt-2 mr-2 rounded-full border border-red-200 hover:bg-red-100 transition"
              >
                Remove
              </button>
            </div>
            <p className="text-sm text-gray-700">{reply.content}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {reply.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Reply"
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default RatingComponent;
