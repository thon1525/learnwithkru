"use client";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import Image from "next/image";
import { Button, InputForm } from "@/components/atoms";
import { createClassSchema } from "@/schema/createClassSchema";
import * as Yup from "yup";

interface FormData {
  class_name: string;
  subject: string;
  email: string[];
}

const DEFAULT_FORM_VALUE: FormData = {
  class_name: "",
  subject: "",
  email: [""],
};

const CreateClass = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_VALUE);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name.startsWith("email") && index !== undefined) {
      const newEmails = [...formData.email];
      newEmails[index] = value;
      setFormData({ ...formData, email: newEmails });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const addClassRoom = async (teacherData: FormData) => {
    try {
      console.log("user form data", teacherData);
      // const response = await axios.post(
      //   "http://localhost:3001/api/v1/auth/login",
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    } catch (error) {
      console.error("Error adding classroom:", error);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await createClassSchema.validate(formData, { abortEarly: false });
      addClassRoom(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string | string[] } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            if (e.path.startsWith("email")) {
              const index = parseInt(e.path.split("[")[1].split("]")[0]);
              if (Array.isArray(newErrors.email)) {
                newErrors.email[index] = e.message;
              } else {
                newErrors.email = [];
                newErrors.email[index] = e.message;
              }
            } else {
              newErrors[e.path] = e.message;
            }
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const addEmailField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: [...prevFormData.email, ""],
    }));
  };

  const removeEmailField = (index: number) => {
    setFormData((prevFormData) => {
      const newEmails = prevFormData.email.filter((_, i) => i !== index);
      return { ...prevFormData, email: newEmails };
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (Array.isArray(newErrors.email)) {
        newErrors.email.splice(index, 1);
      }
      return newErrors;
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto flex justify-evenly items-center lg:border-white-30 lg:border-2">
        <div className="hidden lg:block">
          <Image
            src="/createclass.png"
            alt="createclass"
            width={500}
            height={300}
          />
        </div>
        <div className="flex md:[280px] flex-col w-[350px]">
          <div className="flex flex-col justify-center items-center container">
            <p className="font-bold text-2xl lg:text-3xl">Create Classroom</p>
            <p className="text-xs tracking-tight w-[350px] h-[40px] mt-4 lg:text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat,
              molestiae repudiandae! Rem dicta commodi soluta reiciendis
              aspernatur minus. Aperiam, deserunt!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 md:w-[200px]">
              <label className="w-[350px] flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  <InputForm
                    className="mt-4 bg-[#f1f1f1] px-3 md:w-[350px] lg:w-[350px] outline-none"
                    borderColor="border-class"
                    placeholder="ClassName"
                    borderSize="classroom"
                    name="class_name"
                    type="text"
                    onChange={onChangeInput}
                    value={formData.class_name}
                  />
                  {errors.class_name && (
                    <div className="flex justify-start">
                      <small className="mt-2" style={{ color: "red" }}>
                        {errors.class_name}
                      </small>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <InputForm
                    className="mt-4 bg-[#f1f1f1] px-3 md:w-[350px] lg:w-[350px] outline-none"
                    borderColor="border-class"
                    placeholder="Subject"
                    borderSize="classroom"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={onChangeInput}
                  />
                  {errors.subject && (
                    <div className="flex justify-start">
                      <small className="mt-2" style={{ color: "red" }}>
                        {errors.subject}
                      </small>
                    </div>
                  )}
                </div>
                {formData.email.map((email, index) => (
                  <div className="flex flex-col mt-4" key={index}>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <InputForm
                          className="bg-[#f1f1f1] px-3 md:w-[350px] lg:w-[350px] outline-none"
                          borderColor="border-class"
                          placeholder="Email Address"
                          borderSize="classroom"
                          name={`email${index}`}
                          type="email"
                          value={email}
                          onChange={(e) => onChangeInput(e, index)}
                        />
                        <div className="flex flex-col">
                          {errors.email &&
                            Array.isArray(errors.email) &&
                            errors.email[index] && (
                              <div className="flex justify-start">
                                <small
                                  className="mt-2"
                                  style={{ color: "red" }}
                                >
                                  {errors.email[index]}
                                </small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {formData.email.length > 1 && (
                          <button onClick={() => removeEmailField(index)}>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </label>
            </div>
            <div className="">
              <div className="flex justify-end mt-3 text-xs">
                <button
                  type="button"
                  className="underline"
                  onClick={addEmailField}
                >
                  Add your student+
                </button>
              </div>
              <div className="flex justify-center items-center">
                <Button className="w-[100px] h-[30px] text-white text-xs md:w-[100px] md:h-[30px] mb-3 mt-4">
                  Create Class
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { CreateClass };
