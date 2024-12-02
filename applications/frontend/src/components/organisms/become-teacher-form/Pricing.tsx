"use client";
import { Button, InputForm, Typography } from "@/components/atoms";
import { PriceTeachers } from "@/schema/becomeTeacher";
import { BecomeTeacherFormTypes, BecomeTeacherType } from "./@types";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import * as Yup from "yup";
import {
  clearLocalStorage,
  getLocalStorageTeacher,
  setLocalStorageTeacher,
} from "@/utils/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utils/axiosErrorhandler";

const DEFAULT_FORM_VALUE = {
  price: "",
};

interface PriceProps {
  price: string | number;
}

const PricingForm = ({
  title,
  description,
  currentPage,
  pageIndex,
  setCurrentPage,
  setdataTutor,
  dataTutor,
}: BecomeTeacherFormTypes) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<PriceProps>(DEFAULT_FORM_VALUE);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setLocalStorageTeacher("priceTeacher", updatedFormData); // Update local storage with the new form data
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await PriceTeachers.validate(formData, { abortEarly: false });
      // Update dataTutor with the correct price
      const updatedDataTutor = {
        ...dataTutor,
        price: parseInt(formData.price as string, 10),
      };
      setdataTutor(updatedDataTutor);
      
      // Proceed to the next page if applicable
      if (pageIndex !== undefined) {
        setCurrentPage((prevPage) =>
          Math.min(prevPage + 1, pageIndex.length - 1)
        );
      }
      setLocalStorageTeacher("priceTeacher", formData);
      setErrors({});
      // Add the teacher using the updated dataTutor

      addTeacher(updatedDataTutor);
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

  const addTeacher = (teacher: BecomeTeacherType | PriceProps | undefined) => {
    const fetchData = async (
      teacherData: BecomeTeacherType | PriceProps | undefined
    ) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
        const API_ENDPOINT = `${apiUrl}/v1/teachers/become-teacher`;
        const response = await axios.post(
          API_ENDPOINT,
          teacherData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        router.push(`/teachers/${response.data.data._id}`);
        clearLocalStorage("priceTeacher")
        clearLocalStorage("aboutTeacher")
        clearLocalStorage("educationTeacher")
        clearLocalStorage("descriptionTeacher")
        clearLocalStorage("timeAvailableTeacher")
        clearLocalStorage("ProfilePhoto")
        clearLocalStorage("currentPage")

      } catch (error) {
        handleAxiosError(error, {

          handleErrorResponse(response) {
            const { errors } = response.data

            if (errors) {
              setErrors({ serverError: errors.message })

            }
          },
        })
      } finally {
        setIsLoading(false)
      }
    };
    fetchData(teacher);
  };
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const userStorage = getLocalStorageTeacher("priceTeacher")
      ? getLocalStorageTeacher("priceTeacher")
      : DEFAULT_FORM_VALUE;
    setFormData(userStorage);
  }, []);

  return (
    <div className="flex flex-col w-[80%] justify-center items-center px-4 sm:w-[60%] md:w-[80%] lg:w-[60%] xl:w-[60%]">
      <div className="flex flex-col">
        <Typography align="left" fontSize="lg" variant="bold" className="py-4">
          {title}
        </Typography>
        <Typography align="left" fontSize="sm" className="py-2">
          {description}
        </Typography>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col">
            <div className="">
              <InputForm
                type="number"
                placeholder="Enter price"
                borderRadius="md"
                borderSize="md"
                className="border border-purple-500 outline-none text-xs w-full sm:w-[240px]"
                name="price"
                value={formData.price}
                onChange={onChangeInput}
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price}</p>
              )}
              {
                errors.serverError && (
                  <div className="flex flex-col">
                    <small className="text-red-500 text-xs mt-2">
                      {errors.serverError}
                    </small>
                  </div>
                )
              }
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex justify-start gap-4">
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
                  {isLoading ? "Submitting ..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { PricingForm };
