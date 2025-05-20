import React, { useState, useMemo } from "react";

const TopRestaurant = () => {
  const restaurants = [
    {
      _id: "67de302c5c568660258059bf",
      owner_id: {
        _id: "67d924ca7b6ab86d9f93d231",
        avatar: "https://brasol.vn/wp-content/uploads/2022/08/logo-kfc.png",
      },
      name: "Hadilao235",
      description: "ngon miệng nha",
      total_reviews: 0,
      address: "ktx khu a dh quoc gia tp hcm",
      total_orders: 1,
      banners: [
        "https://res.cloudinary.com/dqj8v4x5f/image/upload/v1698236482/restaurant/restaurant_1.jpg",
        "https://res.cloudinary.com/dqj8v4x5f/image/upload/v1698236482/restaurant/restaurant_2.jpg",
      ],
      status: "Enable",
      rating: 4.5,
      isDeleted: false,
    },
    {
      _id: "67de302c5c568660258059c0",
      owner_id: {
        _id: "67d924ca7b6ab86d9f93d231",
        avatar:
          "https://play-lh.googleusercontent.com/eolrJkDuZ2_msCv3a0oh3nqf107oNFXudzUlsN9L8T79C7UwWigYNaArKZgiQpiuqOs",
      },
      name: "Pho24",
      description: "phở ngon tuyệt",
      total_reviews: 50,
      address: "Q1, TP HCM",
      total_orders: 150,
      banners: [],
      status: "Enable",
      rating: 4.3,
      isDeleted: false,
    },
  ];

  const revenue = [
    { restaurant_id: "67de302c5c568660258059bf", revenue: 1000000 },
    { restaurant_id: "67de302c5c568660258059c0", revenue: 5000000 },
  ];

  const [criteria, setCriteria] = useState("total_orders");
  const [order, setOrder] = useState("desc");

  const sortedRestaurants = useMemo(() => {
    return [...restaurants].sort((a, b) => {
      let valA, valB;

      if (criteria === "revenue") {
        valA = revenue.find((r) => r.restaurant_id === a._id)?.revenue || 0;
        valB = revenue.find((r) => r.restaurant_id === b._id)?.revenue || 0;
      } else {
        valA = a[criteria] || 0;
        valB = b[criteria] || 0;
      }

      return order === "asc" ? valA - valB : valB - valA;
    });
  }, [criteria, order, restaurants]);

  return (
    <div className='bg-white p-6 rounded-xl h-full shadow-sm'>
      <h2 className='text-lg font-semibold mb-4'>Top Restaurants</h2>

      <div className='flex flex-wrap items-center gap-6 mb-6'>
        <div className='flex items-center gap-2'>
          <label htmlFor='criteria' className='text-gray-700 font-medium'>
            Select criteria:
          </label>
          <select
            id='criteria'
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value='total_orders'>Top Orders</option>
            <option value='revenue'>Top Revenue</option>
            <option value='total_reviews'>Top Reviews</option>
            <option value='rating'>Top Rating</option>
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <label htmlFor='order' className='text-gray-700 font-medium'>
            Order:
          </label>
          <select
            id='order'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md'>
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border border-yellow-500 rounded-lg shadow'>
          <thead className='bg-black text-yellow-400'>
            <tr>
              <th className='px-4 py-2'>Avatar</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Address</th>
              <th className='px-4 py-2'>Orders</th>
              <th className='px-4 py-2'>Reviews</th>
              <th className='px-4 py-2'>Rating</th>
              <th className='px-4 py-2'>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sortedRestaurants.map((rest, index) => {
              const rev =
                revenue.find((r) => r.restaurant_id === rest._id)?.revenue || 0;
              return (
                <tr
                  key={rest._id}
                  className={
                    index % 2 === 0 ? "bg-yellow-50" : "bg-yellow-100"
                  }>
                  <td className='px-4 py-2 text-center'>
                    <img
                      src={rest.owner_id.avatar}
                      alt='avatar'
                      className='w-10 h-10 object-cover rounded-full mx-auto'
                    />
                  </td>
                  <td className='px-4 py-2 text-center'>{rest.name}</td>
                  <td className='px-4 py-2 text-center'>{rest.address}</td>
                  <td className='px-4 py-2 text-center'>{rest.total_orders}</td>
                  <td className='px-4 py-2 text-center'>
                    {rest.total_reviews}
                  </td>
                  <td className='px-4 py-2 text-center'>{rest.rating}</td>
                  <td className='px-4 py-2 text-center'>
                    {rev.toLocaleString()} VND
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopRestaurant;
