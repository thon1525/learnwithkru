"use client";
import { Button, Typography } from "@/components/atoms";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";
import {
  BecomeTeacherData,
  BecomeTeacherFormTypes,
  TeachersdescriptionProps,
} from "./@types";
import { DescriptionTeachers } from "@/schema/becomeTeacher";
import {
  getLocalStorageTeacher,
  setLocalStorageTeacher,
} from "@/utils/localStorage";

const DEFAULT_FORM_VALUE: TeachersdescriptionProps = {
  bio: "",
  teaching_experience: "",
  motivation: "",
  video: "",
};

const DescriptionForm = ({
  title,
  description,
  fileLabel,
  pageIndex,
  setCurrentPage,
  currentPage,
  setdataTutor,
}: BecomeTeacherFormTypes) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] =
    useState<TeachersdescriptionProps>(DEFAULT_FORM_VALUE);

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const videoFile = event.target.files && event.target.files[0];
    if (videoFile) {
      if (videoFile.size > 10*1024 * 1024) { // 1MB limit
        setErrors((prevErrors) => ({ ...prevErrors, video: "video size is too large" }));
      } else {
        const videoUrl = URL.createObjectURL(videoFile);
        setFormData({ ...formData, video: videoUrl });
        setErrors((prevErrors) => ({ ...prevErrors, certificate: "" }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await DescriptionTeachers.validate(formData, { abortEarly: false });
      setdataTutor((prev: BecomeTeacherData) => ({ ...prev, ...formData }));
      if (pageIndex !== undefined) {
        setCurrentPage((prevPage) => {
          const newPage = prevPage + 1;
          localStorage.setItem('currentPage', newPage.toString());
          return newPage;
        });
      }
      setLocalStorageTeacher("descriptionTeacher", formData);
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

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const userStorage = getLocalStorageTeacher("descriptionTeacher");
    if (userStorage) {
      setFormData(userStorage);
    }
  }, []);

  return (
    <div className="w-[370px] sm:w-[460px] md:w-[500px] lg:w-[700px] xl:w-[900px] h-auto flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <Typography
          align="left"
          fontSize="lg"
          variant="bold"
          className="py-2 sm:pl-0 flex justify-start w-full"
        >
          {title}
        </Typography>
        <Typography
          align="left"
          fontSize="sm"
          className="py-2 sm:pl-0 flex justify-start"
        >
          {description}
        </Typography>
        <div className="flex flex-col items-start gap-4 py-5">
          <div className="flex flex-col items-end">
            <div className="flex justify-start">
              <div className="flex flex-col w-20 sm:mt-[45px] mt-[40px]">
                <label htmlFor="bio" className="text-sm">
                  BIO
                </label>
              </div>
              <div className="flex flex-col pl-0">
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="at least 50 characters"
                  onChange={onChangeInput}
                  value={formData.bio}
                  className="outline-none w-[300px] sm:w-[350px] sm:h-[200px] h-[150px] px-2 py-1 text-sm border border-purple-500"
                ></textarea>
                {errors.bio && (
                  <div className="flex justify-start">
                    <small className="mt-2" style={{ color: "red" }}>
                      {errors.bio}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-start">
              <div className="flex flex-col w-20 sm:mt-[45px] mt-[40px]">
                <label htmlFor="teachingExperience" className="text-sm">
                  Teaching Experience
                </label>
              </div>
              <div className="flex flex-col pl-0">
                <textarea
                  id="teaching_experience"
                  name="teaching_experience"
                  placeholder="at least 40 characters"
                  onChange={onChangeInput}
                  value={formData.teaching_experience}
                  className="outline-none w-[300px] sm:w-[350px] h-[120px] px-2 py-1 text-sm border border-purple-500"
                ></textarea>
                {errors.teaching_experience && (
                  <div className="flex justify-start">
                    <small className="mt-2" style={{ color: "red" }}>
                      {errors.teaching_experience}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-start">
              <div className="flex flex-col w-20 sm:mt-[45px] mt-[40px]">
                <label htmlFor="motivatePotentail" className="text-sm">
                  Motivate Potential Study
                </label>
              </div>
              <div className="flex flex-col pl-0">
                <textarea
                  id="motivation"
                  name="motivation"
                  placeholder="at least 40 characters"
                  onChange={onChangeInput}
                  value={formData.motivation}
                  className="outline-none w-[300px] sm:w-[350px] h-[120px] px-2 py-1 text-sm border border-purple-500"
                ></textarea>
                {errors.motivation && (
                  <div className="flex justify-start">
                    <small className="mt-2" style={{ color: "red" }}>
                      {errors.motivation}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="fileLabel" className="cursor-pointer mt-2">
              Please input the video about yourself
              <div>
                <span className="text-sm flex justify-center">{fileLabel}</span>
                <label className="w-[380px] sm:w-[570px] h-27 flex flex-col items-center py-6 border-purple-500 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-400">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Select a Video
                  </span>
                  {formData.video && (
                    <span className="mt-2 text-base leading-normal">
                      {formData.video}
                    </span>
                  )}
                  <input
                    type="file"
                    name="video"
                    onChange={handleVideoChange}
                    className="hidden"
                    ref={inputFileRef}
                    accept="video/*"
                  />
                </label>
              </div>
            </label>
            {errors.video && (
              <div className="flex justify-start">
                <small className="mt-2" style={{ color: "red" }}>
                  {errors.video}
                </small>
              </div>
            )}
          </div>
          <div className="flex flex-col self-end">
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
  );
};

export { DescriptionForm };
