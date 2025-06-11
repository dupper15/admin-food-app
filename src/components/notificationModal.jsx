import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNotification } from "../services/notificationService";

const NotificationModal = ({ setOpenNotificationModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNotificationMutation = useMutation({
    mutationFn: async (data) => await createNotification(data),
    onSuccess: (data) => {
      console.log("Create notification success:", data);
      handleCancel();
    },
    onError: (error) => {
      console.error("Create notification failed:", error);
    },
  });

  const handleSend = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    createNotificationMutation.mutate({
      title,
      content,
    });
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setOpenNotificationModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow">
        <h3 className="text-xl font-bold text-yellow-500 mb-4">
          Create New Notification
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded text-black"
        />
        <textarea
          placeholder="Message content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-24 mb-4 px-3 py-2 border rounded text-black"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-1 border rounded text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
