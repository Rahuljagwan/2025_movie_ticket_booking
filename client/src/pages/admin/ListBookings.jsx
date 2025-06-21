import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import BlurCircle from "../../components/BlurCircle";
import timeFormat from "../../lib/timeFormat";
import { dateFormat } from "../../lib/dateFormat";
import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                <td className="p-2">{item.show.movie.title}</td>
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </td>
                <td className="p-2">{currency + item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );

  // return !isLoading ? (
  //   <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-30 min-h-[80vh]">
  //     <BlurCircle top="100px" left="100px" />
  //     <BlurCircle bottom="0px" left="600px" />
  //     <h1 className="text-lg font-semibold mb-4">My Bookings</h1>
  //     {bookings.map((item, index) => (
  //       <div
  //         key={index}
  //         className="flex flex-col md:flex-row justify-between
  //     bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
  //       >
  //         <div className="flex flex-col md:flex-row">
  //           <img
  //             src={item.show.movie.poster_path}
  //             alt=""
  //             className="md:max-w-45
  //         aspect-video h-auto object-cover object-bottom rounded"
  //           />
  //           <div className="flex flex-col p-4">
  //             <p className="text-lg font-semibold">{item.show.movie.title}</p>
  //             <p className="text-gray-400 text-sm">
  //               {timeFormat(item.show.movie.runtime)}
  //             </p>
  //             <p className="text-gray-400 text-sm mt-auto">
  //               {dateFormat(item.show.showDateTime)}
  //             </p>
  //           </div>
  //         </div>

  //         <div className="flex flex-col md:items-end md:text-right justify-between p-4">
  //           <div className="flex items-center gap-4">
  //             <p className="text-2xl font-semibold mb-3">
  //               {currency}
  //               {item.amount}
  //             </p>
  //             {item.isPaid && (
  //               <button className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
  //                 Pay Now
  //               </button>
  //             )}
  //           </div>
  //           <div className="text-sm">
  //             <p>
  //               <span className="text-gray-400">Total Tickets:</span>{" "}
  //               {item.bookedSeats.length}
  //             </p>
  //             <p>
  //               <span className="text-gray-400">Seat Number:</span>{" "}
  //               {item.bookedSeats.join(",")}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // ) : (
  //   // Content when not loading (missing from image)
  //   <Loading />
  // );
};

export default ListBookings;
