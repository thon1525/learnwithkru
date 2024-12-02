"use client";
import { ITeacher } from "@/@types/teacher.type";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import * as Yup from "yup";

interface DescriptionProps {
  teacher: ITeacher;
}

const EmailUser: FC<DescriptionProps> = ({ teacher }) => {
 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    email: teacher.email || ""
  });

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const UpdatePasswordSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email(),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await UpdatePasswordSchema.validate(formData, { abortEarly: false });
      setErrors({});
      // Handle form submission logic here
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
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">
        Account Settings
      </h2>
    
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row  sm:justify-center">
            <div className="flex flex-col">
              <div className="mb-4 sm:w-[400px]">
                <label className="block text-gray-700">Email</label>
                <input
                  type="mail"
                  name="email"
                  value={formData.email}
                  onChange={onChangeInput}
                  className="w-[200px] sm:w-[400px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-violet-700 text-white text-[16px] font-bold py-2 px-4 rounded hover:bg-violet-800 focus:outline-none focus:shadow-outline"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default EmailUser;
