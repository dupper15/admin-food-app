import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllReflect, replyReflect } from "../services/reflectService";
import { formatID } from "./../utils/formatID";
import { debounce } from "lodash";

const ManageReflect = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reflects, setReflects] = useState([]);
  const [countReflect, setCountReflect] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSend, setIsLoadingSend] = useState({});
  const [messages, setMessages] = useState({});
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage = 2;
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = useCallback(
    debounce((val) => {
      setDebouncedSearch(val);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debounceSearch(val);
  };

  const getAllReflectMutation = useMutation({
    mutationFn: async ({ page, limit, filter, q }) => {
      return await getAllReflect(page, limit, filter, q);
    },
    onSuccess: (data) => {
      setReflects(data.data);
      setCountReflect(data.total);
      setIsLoading(false);
      console.log("Fetch reflect success:", data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Fetch reflect failed:", error);
    },
  });

  const replyReflectMutation = useMutation({
    mutationFn: async ({ id, message }) => {
      return await replyReflect(id, message);
    },
    onSuccess: (data) => {
      alert(`Reply successful`);
      setMessages((prev) => ({ ...prev, [data._id]: "" }));
      console.log("Reply reflect success:", data);
      setRefresh((prev) => !prev);
      setIsLoadingSend((prev) => ({ ...prev, [data._id]: true }));
      setIsLoading(false);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Reply reflect failed:", error);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getAllReflectMutation.mutate({
      page: currentPage,
      limit: itemsPerPage,
      filter: filter,
      q: debouncedSearch,
    });
  }, [currentPage, filter, debouncedSearch, refresh]);

  const totalPages = Math.ceil(countReflect / itemsPerPage);

  const handleChangeMessage = (id, value) => {
    setMessages((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (reflect) => {
    const msg = messages[reflect._id];
    if (!msg?.trim()) return;
    replyReflectMutation.mutate({ id: reflect?._id, message: msg });
    setIsLoadingSend((prev) => ({ ...prev, [reflect._id]: true }));
  };

  return (
    <div className="p-6 space-y-6 h-full bg-slate-100">
      <h2 className="text-2xl font-bold">Customer Feedback</h2>
      <div className="relative w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search users..."
          className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "replied" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("replied");
            setCurrentPage(1);
          }}
        >
          Replied
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "unreplied" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setFilter("unreplied");
            setCurrentPage(1);
          }}
        >
          Unreplied
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">
          Loading feedback...
        </div>
      ) : reflects.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No feedback found.
        </div>
      ) : (
        reflects.map((reflect) => (
          <div
            key={reflect?._id}
            className={`border p-4 rounded-xl shadow-sm transition ${
              reflect?.replies_array?.length === 0
                ? "bg-red-50 border-red-300"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-600">
                Customer: {reflect?.customer_id?.name} (
                {formatID(reflect?.customer_id?._id)}) |{" "}
                {new Date(reflect?.create_at).toLocaleString()}
              </div>
              {reflect.restaurant_id && (
                <a
                  href={`/main/restaurant/${reflect.restaurant_id}`}
                  className="text-yellow-500 underline text-sm"
                >
                  View restaurant
                </a>
              )}
            </div>
            <p className="text-gray-800 mb-2">{reflect?.content}</p>
            {reflect?.replies_array.map((reply, idx) => (
              <li key={idx}>
                <p>{reply.content}</p>
                {reply.images?.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {reply.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="reply-img"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
            {reflect?.replies_array.length > 0 && (
              <div className="text-sm text-green-600 mb-2">
                <strong>Replies:</strong>
                <ul className="list-disc ml-6 space-y-2 mt-1">
                  {reflect.replies_array.map((reply, idx) => (
                    <li key={idx}>
                      <p>{reply.content}</p>
                      {reply.images?.length > 0 && (
                        <div className="flex gap-2 mt-1">
                          {reply.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt="reply-img"
                              className="w-20 h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter your reply..."
                value={messages[reflect._id] || ""}
                onChange={(e) =>
                  handleChangeMessage(reflect._id, e.target.value)
                }
                className="flex-1 border rounded px-3 py-1"
              />
              <button
                onClick={() => handleSendReply(reflect)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-700"
              >
                {isLoadingSend[reflect._id] ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition"
            onClick={() => () => setCurrentPage((p) => Math.max(1, p - 1))}
          >
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
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-white border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-500 hover:text-white transition"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageReflect;
