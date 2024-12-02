"use client";

import { Button, Typography } from "@/components/atoms";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RatingStar = ({ id }: { id: string }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<{ [key: string]: string | undefined }>({});
  const [isLoading, setLoading] = useState(false);

  const togglePopup =  () => {
    setPopupOpen(true);
  };

  const handleOnSubmit = async () =>{
    await handleOnRating();

    if(!error.serverError && isPopupOpen){
     await setPopupOpen(false);
    }

  }

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const backgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setPopupOpen(false);
    }
  };

  const handleOnRating = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await axios.post(
        `${baseUrl}/v1/teachers/rate/${id}`,
        { rating, feedback },
        { withCredentials: true }
      );

      console.log("Response", response.data);
      return response.data
    } catch (error: unknown) {
      handleAxiosError(error, {
        logError: (message: string) => {
          console.log('Unexpected error occurs: ', message);
        },
        
        handleErrorResponse: (response) => {
          console.log("Error respone: ", response.data)
          const { errors } = response.data;
          if (errors) {
            console.log("handleOnRate occurs error", errors.message);
            setError({ serverError: errors.message });
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const starsArray = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div>
      <Button onClick={togglePopup} radius="sm" className="w-[300px] h-[40px]">
        Rate me
      </Button>
      {isPopupOpen && (
        <div onClick={backgroundClick} className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="mx-auto flex flex-col w-[450px] p-5 gap-5 items-center border rounded-md shadow-lg bg-white">
            <Button
              colorScheme="tertiary"
              className="self-end"
              onClick={() => setPopupOpen(false)}
              radius="md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#F01C1C"
                  d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
                />
              </svg>
            </Button>
            <Typography fontSize="lg" variant="bold">
              Rate Your Experience
            </Typography>
            <Typography className="md">
              Please Rate Your Educational Experience!!!
            </Typography>
            <div className="flex justify-center gap-5">
              {starsArray.map((index) => (
                <svg
                  key={`star-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < rating ? "yellow" : "none"}
                  stroke={index < rating ? "yellow" : "currentColor"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="w-[32px] h-[32px] cursor-pointer"
                  onClick={() => handleStarClick(index)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>
            <form>
              <div>
                <textarea
                  rows={3}
                  cols={25}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  className="bg-gray-200 border rounded-lg p-4 text-sm focus:outline-none resize-none"
                  placeholder="Tell Us More About Your Feedback"
                ></textarea>
                {error.serverError && (
                  <p className="text-red-500 text-sm ">{error.serverError}</p>
                )}
              </div>
            </form>
            <Button
              colorScheme="secondary"
              radius="md"
              className="w-[150px] h-[40px]"
              onClick={handleOnSubmit}
              isDisabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { RatingStar };
