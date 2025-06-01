import React from "react";
import { formatDuration } from "./../utils/formatTime";

const DetailModal = ({ data, type, setShow }) => {
  console.log("data", data);
  const renderFields = () => {
    switch (type) {
      case "Customer":
        return (
          <>
            <Info label="Name" value={data.name} />
            <Info label="Email" value={data.email} />
            <Info label="Phone" value={data.phone} />
            <Info label="Verified" value={data.isVerified ? "Yes" : "No"} />
            <Info label="Total Orders" value={data.total_orders} />
            <Info label="Total Logins" value={data.total_logins} />
            <Info
              label="Total Time Spent"
              value={`${formatDuration(data.total_time_spent)}`}
            />
            <Info
              label="Last Login"
              value={new Date(data.last_login).toLocaleString()}
            />
          </>
        );
      case "Restaurant owner":
        return (
          <>
            <Info label="Email" value={data.email} />
            <Info label="Phone" value={data.phone} />
            <Info label="Verified" value={data.isVerified ? "Yes" : "No"} />
            <Info label="Total Logins" value={data.total_logins} />
            <Info
              label="Total Time Spent"
              value={`${formatDuration(data.total_time_spent)}`}
            />
          </>
        );
      case "Admin":
        return (
          <>
            <Info label="Email" value={data.email} />
            <Info label="Status" value={data.status} />
          </>
        );
      default:
        return <p className="text-red-500">Unknown type</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
          onClick={() => setShow(false)}
        >
          &times;
        </button>

        {data.avatar && (
          <div className="flex justify-center mb-4">
            <img
              src={data.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
          User Detail
        </h2>

        <div className="space-y-3">{renderFields()}</div>
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

export default DetailModal;
