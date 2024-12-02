"use client";
import { Button, InputForm, Typography } from "@/components/atoms";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { Select } from "@/components/atoms/select/select";
import * as Yup from "yup";
import { teachersExperience } from "@/schema/becomeTeacher";
import {
  getLocalStorageTeacher,
  setLocalStorageTeacher,
} from "@/utils/localStorage";
import { BecomeTeacherData, BecomeTeacherFormTypes } from "../../become-teacher-form/@types";

const DEFAULT_FORM_VALUE = {
  university: "",
  year_experience: "",
  type_degree: "",
  certificate: "",
};

const dataExperience = {
  dataYear: [
    { id: "1244", numberData: 1 },
    { id: "124664", numberData: 2 },
    { id: "12444", numberData: 3 },
    { id: "12444", numberData: 4 },
    { id: "12444", numberData: 5 },
    { id: "12444", numberData: 6 },
    { id: "12444", numberData: 7 },
    { id: "12444", numberData: 8 },
    { id: "12444", numberData: 9 },
    { id: "12444", numberData: 10 },
    { id: "12444", numberData: 11 },
    { id: "12444", numberData: 12 },
    { id: "12444", numberData: 13 },
    { id: "12444", numberData: 14 },
    { id: "12444", numberData: 15 },
    { id: "12444", numberData: 16 },
    { id: "12444", numberData: 17 },
    { id: "12444", numberData: 18 },
    { id: "12444", numberData: 19 },
    { id: "12444", numberData: 20 },
  ],
};


const degreeData = {
  degreeOptions: [
    { id: "1", degree: "Associate's degree" },
    { id: "2", degree: "Bachelor's degree" },
    { id: "3", degree: "Master's degree" },
    { id: "4", degree: "Doctoral degree" },
    { id: "5", degree: "Professional degree" },
    { id: "6", degree: "Technical diploma" },
    { id: "7", degree: "Certificate" },
  ]
};

const BecomeTeacherForm = ({
  description,
  checkboxtext,
  currentPage,
  setCurrentPage,
  pageIndex,
  setdataTutor,
}: BecomeTeacherFormTypes) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] =
    useState<BecomeTeacherData>(DEFAULT_FORM_VALUE);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowForm(e.target.checked);
    setLocalStorageTeacher("educationTrue", e.target.checked);
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    setLocalStorageTeacher("educationTeacher", { ...formData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      if (imageFile.size > 1024 * 1024) {
        // 1MB limit
        setErrors((prevErrors) => ({
          ...prevErrors,
          certificate: "Image size is too large",
        }));
      } else {
        const imageUrl = URL.createObjectURL(imageFile);
        setFormData({ ...formData, certificate: imageUrl });
        setErrors((prevErrors) => ({ ...prevErrors, certificate: "" }));
      }
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await teachersExperience.validate(formData, { abortEarly: false });
      if (pageIndex !== undefined) {
        setCurrentPage((prevPage) =>
          Math.min(prevPage + 1, pageIndex.length - 1)
        );
      }
      setErrors({});
      const year_experience = parseInt(formData.year_experience);
      setdataTutor((prev: any) => ({
        ...prev,
        university: formData.university,
        type_degree: formData.type_degree,
        certificate: formData.certificate,
        year_experience: year_experience,
      }));
      setLocalStorageTeacher("educationTeacher", formData);
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

  const handleSubmitNoDegree: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (pageIndex !== undefined) {
        setCurrentPage((prevPage) =>
          Math.min(prevPage + 1, pageIndex.length - 1)
        );
      }
      const year_experience= 0;
      setdataTutor((prev: any) => ({ ...prev, university: formData.university,
        type_degree: formData.type_degree,
        certificate: formData.certificate,
        year_experience: year_experience }));
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  useEffect(() => {
    const userStorage =
      getLocalStorageTeacher("educationTeacher") || DEFAULT_FORM_VALUE;
    setFormData(userStorage);
    console.log("alete then beck ", userStorage.certificate);
    const userTrue = getLocalStorageTeacher("educationTrue") || false;
    setShowForm(userTrue);
  }, []);

  return (
    <div className="h-auto w-[350px] sm:w-[800px] md:w-[800px] lg:w-[800px] xl:w-[1000px] flex justify-center">
      <div className="flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] h-auto">
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-start sm:justify-start">
            <Typography
              align="left"
              fontSize="lg"
              variant="bold"
              className="w-auto"
            >
              Teaching Certification
            </Typography>
          </div>
          <div className="mt-2">
            <Typography
              fontSize="sm"
              align="left"
              className="flex text-wrap w-full"
            >
              {description}
            </Typography>
          </div>
        </div>
        <div className="flex justify-center sm:justify-start md:justify-center mt-5 mb-5">
          <div className="flex w-[400px] justify-center sm:justify-start md:justify-center">
            <div className="flex py-[2px] pr-[10px]">
              <InputForm
                type="checkbox"
                borderRadius="md"
                borderSize="checkbox"
                onChange={handleCheckboxChange}
                checked={showForm}
                className="border border-purple-500outline-none text-xs"
              />
            </div>
            <div className="flex">{checkboxtext}</div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {!showForm ? (
            <div className="flex justify-center sm:justify-start md:justify-center w-full mt-3">
              <form
                action=""
                onSubmit={handleSubmitNoDegree}
                className="w-full"
              >
                <div className="w-full flex flex-col gap-4 pl-[30px] sm:pl-[5px] md:pl-[10px]">
                  <div className="flex flex-col w-[450px] sm:w-[450px]">
                    <InputForm
                      borderRadius="md"
                      borderSize="Subject"
                      name="university"
                      type="hidden"
                      onChange={handleCheckboxChange}
                      className="border border-purple-500 pl-3 outline-none text-xs"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center gap-4">
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
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full flex justify-center sm:justify-start md:justify-center sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
              <form action="" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col w-[300px] sm:w-[450px]">
                    <InputForm
                      placeholder="university"
                      borderRadius="md"
                      borderSize="Subject"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={onChangeInput}
                      className="border border-purple-500 pl-3 outline-none text-xs"
                    />
                    {errors.university && (
                      <div className="flex justify-start">
                        <small className="mt-2" style={{ color: "red" }}>
                          {errors.university}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-[300px] sm:w-[450px]">
                    <Select
                      borderRadius="md"
                      borderSize="Subject"
                      name="year_experience"
                      value={formData.year_experience}
                      onChange={onChangeInput}
                      className="border border-purple-500 outline-none text-xs"
                    >
                      <option value="0" selected>
                        Year of experience
                      </option>
                      {dataExperience.dataYear.map(
                        (dataYear, index: number) => (
                          <option key={index} value={dataYear.numberData}>
                            {dataYear.numberData}
                          </option>
                        )
                      )}
                    </Select>
                    {errors.year_experience && (
                      <div className="flex justify-start">
                        <small className="mt-2" style={{ color: "red" }}>
                          {errors.year_experience}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-[300px] sm:w-[450px]">
                    <Select
                      borderRadius="md"
                      borderSize="Subject"
                      name="type_degree"
                      value={formData.type_degree}
                      onChange={onChangeInput}
                      className="border border-purple-500 outline-none text-xs"
                    >
                      <option value="0" selected>
                        Type of Degree
                      </option>
                      {degreeData.degreeOptions.map((degrees, index: number) => (
                        <option key={index}  value={degrees.degree}>
                          {degrees.degree}
                        </option>
                      ))}
                    </Select>
                    {errors.type_degree && (
                      <div className="flex justify-start">
                        <small className="mt-2" style={{ color: "red" }}>
                          {errors.type_degree}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-[300px] sm:w-[450px]">
                    <div className="flex justify-start">
                      <Typography>
                        Please Input Your Degree To verify
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-col w-[300px] sm:w-[450px]">
                    <div className="flex flex-col">
                      <div className="flex flex-col relative border border-[#7B2CBF] focus:border-2 rounded-md">
                        <div className="flex justify-between cursor-pointer">
                          <svg
                            width="25"
                            height="24"
                            className="w-[30px] h-[30px] py-[2px]"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5 16.5V18.75C3.5 19.3467 3.73705 19.919 4.15901 20.341C4.58097 20.7629 5.15326 21 5.75 21H19.25C19.8467 21 20.419 20.7629 20.841 20.341C21.2629 19.919 21.5 19.3467 21.5 18.75V16.5M8 7.5L12.5 3M12.5 3L17 7.5M12.5 3V16.5"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <InputForm
                            borderRadius="md"
                            type="file"
                            borderSize="Subject"
                            borderColor="file"
                            name="certificate"
                            ref={inputFileRef}
                            accept=".pdf, .jpg, .jpeg"
                            onChange={handleImageChange}
                            className="pl-3 cursor-pointer file:cursor-pointer outline-none text-stone-400 file:text-sm file:text-stone-400 file:bg-none file:border-0 text-xs"
                          />
                          <div className="flex flex-col pr-[20px] pt-[10px]">
                            <svg
                              width="18"
                              height="10"
                              className="w-[15px] h-[15px]"
                              viewBox="0 0 18 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5 1.25L9 8.75L1.5 1.25"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {errors.certificate && (
                        <div className="flex justify-start">
                          <small className="mt-2" style={{ color: "red" }}>
                            {errors.certificate}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-end gap-4">
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
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { BecomeTeacherForm };
