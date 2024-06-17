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
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "api.learnwithkru.com"
        const data = JSON.stringify(teacherData);
        const response = await axios.post(
          `${baseUrl}/v1/teachers/become-teacher`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Log respone: ", response)
        if (response.data.errors) {
          console.log("An error occurred: teachers ", response.data.errors);
          return false;
        }
        console.log("teacher", response.data);
        router.push(`/teachers/${response.data.data.id}`);
        clearLocalStorage("priceTeacher")
        clearLocalStorage("aboutTeacher")
        clearLocalStorage("educationTeacher")
        clearLocalStorage("descriptionTeacher")
        clearLocalStorage("timeAvailableTeacher")
        clearLocalStorage("ProfilePhoto")
        
      } catch (error) {
        console.error("Error occurred during submission:", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error response: teachers", error.response);
        }
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
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex justify-start gap-4">
                {currentPage > 0 && (
                  <Button
                    onClick={handleBack}
                    radius="md"
                    className="hover:bg-violet-700 text-white text-[16px] flex justify-center w-[100px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  radius="md"
                  className="hover:bg-violet-700 text-white text-[16px] flex justify-center w-[100px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
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
