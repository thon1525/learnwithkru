// <<<<<<< HEAD
// // "use client";
// // import { AuthForm } from "@/@types/users/users";
// // import {
// //   getCurrentDateTime,
// //   getLocalStorage,
// //   setLocalStorage,
// // } from "@/utils/localStorage";
// // import axios, { AxiosError } from "axios";
// // import React, { createContext, useEffect, useState } from "react";
// // interface CardTeachers {
// //   isFavorite: boolean;
// //   userId: string;
// //   first_name: string;
// //   last_name: string;
// //   picture: string;
// //   subject: string;
// //   phone_number: string;
// //   province: string;
// //   university: string;
// //   year_experience: number;
// //   type_degree: string;
// //   bio: string;
// //   teacher_experience: string;
// //   motivation: string;
// //   date_available: object;
// //   price: string;
// //   video: string;
// //   Degree: string;
// // }
// // interface ContextProps {
// //   Data: CardTeachers[];
// //   setData: React.Dispatch<React.SetStateAction<CardTeachers[]>>;
// //   // addNewAuth: (auth: AuthForm) => Promise<void>;
// // }
// // export const Mycontext = createContext<ContextProps>({
// //   Data: [],
// //   setData: () => { },
// //   // addNewAuth: async () => { }
// // });

// // const CardContext = ({ children }: { children: React.ReactNode }) => {
// //   const [Data, setData] = useState<CardTeachers[]>([]);
// //   // const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const { data } = await handleRequestTeacher();
// //         // Check if teachers is an array
// //         if (Array.isArray(data)) {
// //           setData(data); // Update state with fetched data
// //         } else {
// //           console.error("Expected an array of data but got:", data);
// //         } // Update state with fetched data
// //       } catch (error) {
// //         console.error("Unexpected error in fetchData method!:");
// //         console.error("Fetching data accurs error:", error);
// //       }
// //     };
// //     fetchData(); // Call the fetchData function
// //   }, []);
// //   // const handleRequestTeacher = async () => {
// //   //   try {
// =======
// "use client";
// import { AuthForm } from "@/@types/users/users";
// import {
//   getCurrentDateTime,
//   getLocalStorage,
//   setLocalStorage,
// } from "@/utils/localStorage";
// import axios, { AxiosError } from "axios";
// import React, { createContext, useEffect, useState } from "react";
// interface CardTeachers {
//   userId: string;
//   first_name: string;
//   last_name: string;
//   picture: string;
//   subject: string;
//   phone_number: string;
//   province: string;
//   university: string;
//   year_experience: number;
//   type_degree: string;
//   bio: string;
//   teacher_experience: string;
//   motivation: string;
//   date_available: object;
//   price: string;
//   video: string;
//   Degree: string;
// }
// interface ContextProps {
//   Data: CardTeachers[];
//   setData: React.Dispatch<React.SetStateAction<CardTeachers[]>>;
//   // addNewAuth: (auth: AuthForm) => Promise<void>;
//   setSubject: React.Dispatch<React.SetStateAction<string>>;
// }
// export const Mycontext = createContext<ContextProps>({
//   Data: [],
//   setData: () => {},
//   setSubject: () => {},
//   // addNewAuth: async () => { }
// });

// const CardContext = ({ children }: { children: any }) => {
//   const [Data, setData] = useState<CardTeachers[]>([]);
// const [subject, setSubject] = useState('');
//   // const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());
//   const fetchData = async () => {
//     try {
//       const { data } = await handleRequestTeacher();
//       // Check if teachers is an array
//       if (Array.isArray(data)) {
//         setData(data); // Update state with fetched data
//       } else {
//         console.error("Expected an array of data but got:", data);
//       } // Update state with fetched data
//     } catch (error) {
//       console.error("Unexpected error in fetchData method!:");
//       console.error("Fetching data accurs error:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData(); // Call the fetchData function
//   }, []);
//   // const handleRequestTeacher = async () => {
//   //   try {
// >>>>>>> 1f71c7e764a631c1eb810af1d931f609df689730

// //   //     const API_ENDPOINT = "http://localhost:3000/v1/teachers"; // Replace with your actual token
// //   //     const response = await axios.get(API_ENDPOINT, { withCredentials: true });

// //   //     return response.data;
// //   //   } catch (error: any) {
// //   //     console.error("Error fetching teachers:", error);
// //   //     throw error;
// //   //   }
// //   // };
// //   // const toggleFavorite = (id: string) => {
// //   //   setData((prevData) => {
// //   //     if (!id) return prevData; // Check if item is undefined
// //   //     const index = prevData.findIndex((d) => d.id === id);
// //   //     if (index === -1) {
// //   //       return prevData;
// //   //     }
// //   //     const newData = [...prevData];
// //   //     // Toggle isFavorite property
// //   //     newData[index].isFavorite = !newData[index].isFavorite;
// //   //     return newData;
// //   //   });
// //   // };

// //   //  =========================================================================================

// <<<<<<< HEAD
// //   const handleRequestTeacher = async () => {
// //     try {
// //       const API_ENDPOINT = "http://localhost:3000/v1/teachers/teacher-list?pageSize=10&pageNumber=1"; // Replace with your actual token
// //       const response = await axios.get(API_ENDPOINT, { withCredentials: true });

// //       console.log(response)
// //       return response.data;
// //     } catch (error: any) {
// //       console.error("Error fetching teachers:", error);
// //       throw error;
// //     }
// //   };
// =======
//   const handleRequestTeacher = async () => {
//     try {
//       const API_ENDPOINT =
//         "http://localhost:3000/v1/teachers/teacher-list?pageSize=10&pageNumber=1"; // Replace with your actual token
//       const response = await axios.get(API_ENDPOINT, { withCredentials: true });

//       console.log(response);
//       return response.data;
//     } catch (error: any) {
//       console.error("Error fetching teachers:", error);
//       throw error;
//     }
//   };
// >>>>>>> 1f71c7e764a631c1eb810af1d931f609df689730

// //   //  student Fetching

// <<<<<<< HEAD
// //   const contextvalue = {
// //     Data,
// //     setData,
// //   };
// //   return (
// //     <Mycontext.Provider value={contextvalue}> {children} </Mycontext.Provider>
// //   );
// // };
// =======
//   const contextvalue = {
//     Data,
//     setData,
//     setSubject,
//   };
//   return (
//     <Mycontext.Provider value={contextvalue}> {children} </Mycontext.Provider>
//   );
// };
// >>>>>>> 1f71c7e764a631c1eb810af1d931f609df689730

// // export default CardContext;
