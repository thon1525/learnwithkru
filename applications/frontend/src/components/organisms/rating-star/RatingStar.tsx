"use client";
import { Button, Typography } from "@/components/atoms";
import React, { useEffect, useState } from "react";

const RatingStar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""

    }
  }, [isPopupOpen]);

  const backgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setPopupOpen(false);
    }

  }

  const starsArray = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div >
      <Button onClick={togglePopup} radius="sm" className="w-[300px] h-[40px]">
        Rate me
      </Button>
      {isPopupOpen && (
        <div onClick={backgroundClick} className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="mx-auto flex flex-col w-[450px] p-5 gap-5 items-center border rounded-md shadow-lg bg-white">
            <Button
              colorScheme="tertiary"
              className="self-end"
              onClick={togglePopup}
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
            {/* Star icons */}
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
            <form action="">
              <div>
                <textarea
                  name=""
                  id=""
                  rows={3}
                  cols={35}
                  className="bg-gray-200 border rounded-lg p-5 focus:outline-none resize-none"
                  placeholder="Tell Us More About Your Feedback"
                ></textarea>
              </div>
            </form>
            <Button
              colorScheme="secondary"
              radius="md"
              className="w-[150px] h-[40px]"
              onClick={togglePopup}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { RatingStar };
