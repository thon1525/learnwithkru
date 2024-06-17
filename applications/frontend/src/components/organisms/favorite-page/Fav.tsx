// "use client "
// import React, { useContext } from "react";
// import { Mycontext } from "@/context/CardContext";
// import { CardTeachers } from "@/components/molecules";

// const Fav = () => {
//     const { Data, setData } = useContext(Mycontext);
//     const favCard = Data.filter((item) => item.isFavorite);

//     const handleFavoriteClick  = (id: string) => {
//         setData((prevData) => {
//           if (!id) return prevData; // Check if item is undefined
//           const index = prevData.findIndex((d) => d.userId === id); // Use _id here
//           if (index === -1) {
//             return prevData;
//           }
//           const newData = [...prevData];
//           // Toggle isFavorite property
//           newData[index].isFavorite = !newData[index].isFavorite;
//           return newData;
//         });
//       };

//     return (
//         <div className="w-full flex flex-col items-center">
//             <h1 className="text-3xl font-bold mb-6 underline mt-4">Your Favorites</h1>
//             <div className="w-[80%] flex justify-center lg:justify-between flex-wrap gap-4">
//                 {favCard.map((item: any) => (
//                     <CardTeachers
//                         key={item.userId} // Assuming userId is unique
//                         bio={item.bio as string}
//                         date_available={item.date_available}
//                         first_name={item.first_name}
//                         last_name={item.last_name}
//                         picture={item.picture}
//                         subject={item.subject}
//                         userId={item.userId}
//                         phone_number={item.phone_number}
//                         province={item.province}
//                         university=""
//                         year_experience={0}
//                         type_degree=""
//                         teacher_experience=""
//                         motivation=""
//                         price={item.price}
//                         video=""
//                         Degree=""
//                         isFavorite={item.isFavorite}
//                         onFavoriteClick={() => handleFavoriteClick(item.userId)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export { Fav };
