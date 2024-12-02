"use client";
import React, { FormEvent, useState } from "react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button, InputForm, Typography } from "@/components/atoms";
import * as Yup from "yup";
import { studentSchema } from "../../../schema/studentForm";
import axios from "axios";
import { Select } from "@/components/atoms/select/select";
import { handleAxiosError } from "@/utils/axiosErrorhandler";

interface Student {
  school_name: string;
  education: string;
  grade: number;
  student_card?: string;
}

const SignupToBecomeStudent = () => {
  const [grade, setGrade] = useState<string>("1");
  const [education, setEducation] = useState<string>("Primary School");
  const [validate, setValidate] = useState<Student>({
    school_name: "",
    student_card: "",
    grade: 1,
    education: "Primary",
  });

  const EducationMenu = [
    { index: 1, value: "Primary School" },
    { index: 2, value: "Secondary School" },
    { index: 3, value: "High School" },
    { index: 4, value: "Others" },
  ];
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Student Fetching
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";

  const handlePostStudent = async (formData: Student) => {
    try {
      const API_ENDPOINT = `${apiUrl}/v1/students/become-student`; // Replace with your actual API endpoint
      await axios.post(API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      router.push("/teachers");
    } catch (error) {
      handleAxiosError(error, {
        logError: (message: string) => {
          // Custom logging implementation, e.g., sending logs to a server
          console.log("Custom log:", message);
        },
        handleErrorResponse: (response) => {
          // Custom response handling
          console.log("Handling response:", response);
          const { errors } = response.data;
          if (errors) {
            if (errors?.message.includes("you're already student")) {
              router.push("/teachers");
            }
            console.log(errors.message);
            setErrors({ server: errors.message });
          }
        },
      });
    }
  };
  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEducation(e.target.value);
    setValidate({ ...validate, education: e.target.value });
    if (errors.education) {
      setErrors((prevErrors) => ({ ...prevErrors, education: "" }));
    }
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value);
    setValidate({ ...validate, grade: Number(e.target.value) });
    if (errors.grade) {
      setErrors((prevErrors) => ({ ...prevErrors, grade: "" }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValidate({ ...validate, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      await studentSchema.validate(validate, { abortEarly: false });
      await handlePostStudent(validate);
      if (validate.student_card) {
        formData.append("student_card", validate.student_card);
      }
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
  return (
    <div className="h-fullflex flex-col justify-between items-center">
      <div className="w-full sm:w-[75%] md:w-[60%] lg:w-[150vh] flex xl:justify-between lg:justify-center justify-start items-center xl:gap-20">
        <div className="w-[80%] md:w-full lg:w-[35%] grid lg:grid-flow-row gap-2 mt-2">
          <Typography
            align="left"
            fontSize="xl"
            variant="2-extrabold"
            className="md:text-[30px] lg:text-[40px] flex justify-center    "
          >
            Student Form
          </Typography>
          <Typography
            fontSize="sm"
            variant="normal"
            className="text-sm lg:text-nowrap w-[390px]"
          >
            You must fill out all the form conditions to become a student in our
            community.
          </Typography>

          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            className="w-[120px] lg:w-full lg:grid lg:grid-flow-row lg:gap-3 ml-10 md:gap-3 sm:gap-3 mt-5"
          >
            <div>
              <Typography className="flex justify-start text-nowrap">
                Enter your school name
              </Typography>
              <InputForm
                type="text"
                placeholder="School Name"
                borderColor="secondary"
                borderRadius="md"
                name="school_name"
                className="border border-[#445455] outline-none w-[300px] h-14 md:w-[350px] sm:w-[350px] lg:w-[500px]"
                value={validate.school_name}
                onChange={handleChange}
              />
              {errors.school_name && (
                <p className="text-red-500 text-nowrap">{errors.school_name}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between  sm:justify-between  w-[330px] md:w-[350px] sm:w-[350px] lg:w-[500px]">
                <Typography className="flex justify-start text-nowrap">
                  Fill Your Student Card
                </Typography>
                <Typography className="text-red-500">*optional</Typography>
              </div>

              <InputForm
                type="file"
                placeholder="student_card"
                borderColor="secondary"
                borderRadius="md"
                paddingY="sm"
                onChange={() => {}}
                className="border border-[#445455] outline-none w-[300px] md:w-[350px] sm:w-[350px] lg:w-[500px] h-14 p-3"
              />
            </div>
            {/* <div>
                            <Typography className="flex justify-start">Education</Typography>
                            <Select
                                value={education}
                                onChange={e => setEducation(e.target.value)}
                                className="border border-gray-500 h-14 -[330px] md:w-[350px] sm:w-[350px] lg:w-[500px] "

                            >
                                <option value="" disabled>Select your Education</option>
                                {EducationMenu.map((item: any, index: number) => (

                                    <option key={index} value={item.value}>
                                        {item.value}

                                    </option>
                                ))}</Select>
                         
                            {errors.education && (
                                <p className="text-red-500  text-nowrap">{errors.education}</p>
                            )}
                        </div> */}
            <div>
              <Typography className="flex justify-start">Education</Typography>
              <Select
                value={education}
                onChange={handleEducationChange}
                className="border border-gray-500 h-14 w-[330px] md:w-[350px] sm:w-[350px] lg:w-[500px] "
              >
                <option value="" disabled>
                  Select your Education
                </option>
                {EducationMenu.map((item: any, index: number) => (
                  <option key={index} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </Select>
              {errors.education && (
                <p className="text-red-500  text-nowrap">{errors.education}</p>
              )}
            </div>
            <div>
              <Typography className="flex justify-start text-nowrap">
                What Grade do you Study?
              </Typography>

              {errors.grade && (
                <p className="text-red-500 text-nowrap">{errors.grade}</p>
              )}

              <Select
                value={grade}
                onChange={handleGradeChange}
                className="border border-gray-500 h-14 w-[300px] md:w-[350px] sm:w-[350px] lg:w-[500px]"
              >
                <option value="" disabled>
                  Select your Education
                </option>
                {education === "Primary School" &&
                  [...Array(6)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Grade {index + 1}
                    </option>
                  ))}
                {education === "Secondary School" &&
                  [...Array(3)].map((_, index) => (
                    <option key={index + 7} value={index + 7}>
                      Grade {index + 7}
                    </option>
                  ))}
                {education === "High School" &&
                  [...Array(3)].map((_, index) => (
                    <option key={index + 10} value={index + 10}>
                      Grade {index + 10}
                    </option>
                  ))}
                {education === "Others" &&
                  [...Array(4)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Grade {index + 1}
                    </option>
                  ))}
                {education !== "Primary School" &&
                  education !== "Secondary School" &&
                  education !== "High School" &&
                  education! === "Others" &&
                  [...Array(12)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Grade {index + 1}
                    </option>
                  ))}
              </Select>
            </div>

            {errors.server && (
              <p className="text-red-500 text-sm text-nowrap">
                {errors.server}
              </p>
            )}

            <div className="w-[330px] md:w-[350px] sm:w-[350px] lg:w-[500px] flex justify-center md:justify-center lg:justify-start">
              <Button
                colorScheme="primary"
                fontColor="white"
                radius="md"
                type="submit"
                className="py-[8px] md:py-2 mt-4 w-[150px] h-12 text-sm sm:justify-center sm:w-[350px] md:w-[350px] lg:w-[500px]"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <Image
          className="hidden xl:block lg:w-[100%]"
          src={"Profiles/studentform.png"}
          alt="Sign up to become a student"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default SignupToBecomeStudent;
