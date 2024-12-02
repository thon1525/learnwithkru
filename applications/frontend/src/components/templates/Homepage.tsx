"use client";
import {
  HomepageSlider,
  HomeBenner,
  TopTeachersList,
  Footer,
} from "@/components/organisms";
import { ShowEasyText, KruVision, SearchTopTeachers } from "@/components/molecules";
import { useEffect, useState } from "react";
import { ITeacher } from "@/@types/teacher.type";
import axios from "axios";
import { handleAxiosError } from "@/utils/axiosErrorhandler";

const Homepage = ({ isAuth }: { isAuth: boolean }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ITeacher[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await handleRequestTeacher();
        if (Array.isArray(fetchedData.data)) {
          setData(fetchedData.data);
        } else {
          console.error("Expected an array of data but got:", fetchedData);
        }
      } catch (error) {
         handleAxiosError(error,
        {
          logError: (message: string) => {
            // Custom logging implementation, e.g., sending logs to a server
            console.log('Custom log:', message);
          },
          handleErrorResponse(response) {
               const {errors} = response.data;

               if(errors?.code === 404){
                  setData(null)
               }
          },
        },
        
          )
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleRequestTeacher = async () => {
    const API_ENDPOINT = `${apiUrl}/v1/teachers?pageSize=3&name=${search}`;
    try {
      const response = await axios.get(API_ENDPOINT, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  };
  return (
    <div className="max-w-full ">
      {/* Homepage Benner */}

      <HomepageSlider />

      {/* Home-Benner */}

      <HomeBenner isAuth={isAuth} />

      {/* Search Input */}

      <SearchTopTeachers setSearch={setSearch} />

      <div className="grid gap-y-8 md:gap-y-14 ">
        {/*  all subject */}
        {isLoading ? (
          <div className="w-full flex justify-center pt-10">
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-9 w-9 border-t-4 border-[#7B2CBF]">
              </div>
            </div>
          </div> // Render loading state
        ) : (
          <TopTeachersList data={data}  />
        )}

        {/* benner card */}
        <KruVision />
        <ShowEasyText />
      </div>
      <div className="w-full  flex justify-center items-start bg-black">
        <Footer />
      </div>
    </div>
  );
};

export { Homepage };
