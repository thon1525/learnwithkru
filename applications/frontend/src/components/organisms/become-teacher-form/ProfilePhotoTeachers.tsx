"use client";
import { Button, InputForm, Typography } from "@/components/atoms";
import { ProfilePhoto } from "@/schema/becomeTeacher";
import { BecomeTeacherFormTypes } from "./@types";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";
import {
  getLocalStorageTeacher,
  setLocalStorageTeacher,
} from "@/utils/localStorage";

const DEFAULT_FORM_VALUE = {
  picture: "",
};

interface PriceProps {
  picture: string;
}

const ProfilePhotoTeachers = ({
  title,
  description,
  currentPage,
  pageIndex,
  setCurrentPage,
  setdataTutor,
  dataUser,
  dataTutor,
}: BecomeTeacherFormTypes) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<PriceProps>(DEFAULT_FORM_VALUE);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (imageFile) {
      if (imageFile.size > 1024 * 1024) {
        // 1MB limit
        setErrors((prevErrors) => ({
          ...prevErrors,
          picture: "profile size is too large",
        }));
        setPreviewURL("");
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setFormData({ ...formData, picture: imageUrl });
        setPreviewURL(imageUrl);
        setErrors((prevErrors) => ({ ...prevErrors, picture: "" }));
      }
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await ProfilePhoto.validate(formData, { abortEarly: false });
      setIsFormComplete(true);
      if (pageIndex !== undefined) {
        setCurrentPage((prevPage) => {
          const newPage = prevPage + 1;
          localStorage.setItem('currentPage', newPage.toString());
          return newPage;
        });
      }
      setdataTutor((prev: PriceProps) => ({ ...prev, ...formData }));
      setLocalStorageTeacher("ProfilePhoto", formData);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const nextPage = () => {
    if (!isFormComplete) {
      return;
    }
  };
  nextPage();
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const userStorage = getLocalStorageTeacher("ProfilePhoto");

    if (userStorage) {
      setFormData(userStorage);
    } else if (dataUser) {
      setFormData({
        picture: dataUser.picture || "",
      });
    }
  }, [dataUser]);

  const CheckmarkIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  return (
    <div className="flex flex-col  justify-center items-center ">
      <div className="flex flex-col w-full gap-3  ">
        <Typography
          align="left"
          fontSize="lg"
          variant="bold"
          className="py-4"
        >
          {title}
        </Typography>
        <Typography align="left" fontSize="sm" className="py-2">
          {description}
        </Typography>


        <div className="w-full h-1 border border-b-gray-50 "></div>

        <form onSubmit={handleSubmit} className="">
          {dataUser && (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white flex w-full p-3 items-center rounded-md shadow-sm">
                <div className="flex self-center w-[120px] h-[120px] rounded-full overflow-hidden">
                  {!previewURL ? (
                    <Image
                      className="object-cover w-full h-full"
                      src={dataUser.picture ?? "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"}
                      alt="Bordered avatar"
                      width={500}
                      height={500}
                    />
                  ) : (
                    previewURL && (
                      <Image
                        src={previewURL}
                        width={500}
                        height={500}
                        alt="Preview"
                        className="object-cover  w-[160px] h-[160px] flex justify-start"
                      />
                    )
                  )}
                </div>
                <div className="flex flex-col  ml-5">
                  <Typography fontSize="md" variant="bold" align="left">
                     {dataUser?.first_name + dataUser?.last_name}
                  </Typography>
                  <div className="flex items-center gap-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    <Typography className="text-sm">{dataTutor?.subject}</Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    <Typography className="text-sm">{dataTutor?.province}</Typography>
                  </div>
                </div>
              </div>
                <div className="w-full border-2 border-gray-500 rounded-md flex justify-center items-center mt-10 ">
                <label className=" text-gray-600 w-[100%] h-[45px] sm:w-[100%] sm:h-[45px] md:w-[40%] md:h-[45px] lg:w-[40%] lg:h-[35px] rounded-md xl:w-[40%] xl:h-[40px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[16px] flex items-center justify-center cursor-pointer">
                <InputForm
                  type="file"
                  className="hidden"
                  name="picture"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={inputFileRef}
                />
                Upload photo
              </label>
                </div>
              {errors.picture && (
                <div className="flex justify-start">
                  <small className="mt-2" style={{ color: "red" }}>
                    {errors.picture}
                  </small>
                </div>
              )}
              {/* Pictur sample */}
              <div className="w-full flex flex-col gap-5 mt-10">
                <Typography fontSize="lg" variant="bold" align="left">
                  What your photo needs
                </Typography>
      
                {/* Describtion */}
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    You should be facing forward
                  </Typography>
                </div>
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    You should be centered and upright
                  </Typography>
                </div>
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    Your face and eyes should be visible (except for religious
                    reasons)
                  </Typography>
                </div>
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    You should be the only person in the photo
                  </Typography>
                </div>
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    Use a color photo with high resolution and no filters
                  </Typography>
                </div>
                <div className="flex">
                  <div>
                    <CheckmarkIcon />
                  </div>
                  <Typography align="left" className="ml-3">
                    Avoid logos or contact information
                  </Typography>
                </div>
              </div>
              <div className="flex w-full justify-end my-10 gap-3">
                {currentPage > 0 && (
                 <button
                  onClick={handleBack}
                 type="submit"
                //  radius="md"
                 className="  items-center bg-white border-gray-400  text-gray-500  hover:bg-violet-900 border  hover:text-white text-sm flex justify-center px-5 font-semibold py-2  rounded-lg focus:outline-none focus:shadow-outline tracking-widest"
                 >
                 Back
                 </button>
                )}
                <Button

type="submit"
radius="md"
className="  items-center bg-violet-900 hover:bg-white hover:border hover:border-gray-400  hover:text-gray-600 text-white text-sm flex justify-center px-10 font-semibold py-2  rounded focus:outline-none focus:shadow-outline tracking-widest"
>
Next
</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export { ProfilePhotoTeachers };
