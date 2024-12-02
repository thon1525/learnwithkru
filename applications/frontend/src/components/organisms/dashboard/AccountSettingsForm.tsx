"use client";
import { ITeacher } from "@/@types/teacher.type";
import React, { ChangeEvent, FC, FormEvent, FormEventHandler, useRef, useState } from "react";
import Image from 'next/image'
import * as Yup from "yup";

interface DescriptionProps {
  teacher: ITeacher;
}

const AccountSettingsForm: FC<DescriptionProps> = ({ teacher }) => {
  const DEFAULT_FORM_VALUE = {
    firstname: teacher.first_name || "",
    lastname: teacher.last_name || "",
     picture: teacher.last_name  || ""
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUE);



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
          picture: "Profile size is too large",
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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    picture: Yup.string()
      .test("file-size", "Image size is too large", function (value) {
        const file =
          value && this.options.context && this.options.context.files
            ? this.options.context.files[value]
            : null;
        if (file && file.size) {
          return file.size <= 1024 * 1024; // 1MB limit
        }
        return true;
      })
      .required("Please upload an image"),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await UpdateUserSchema.validate(formData, { abortEarly: false });
      setErrors({});
      // Submit form data to the server or perform any action here.
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
          <div className="flex flex-col sm:flex-row sm:justify-center">
            <div className="flex flex-col sm:justify-center">
              <div className="mb-4">
                <label className="block text-gray-700">Profile image</label>
                <div className="flex items-center mt-2">
                  {!previewURL ? (
                    <Image
                      className="object-cover w-full h-full"
                      src={teacher.picture ?? "/default-avatar.png"}
                      alt="Bordered avatar"
                      width={160}
                      height={160}
                    />
                  ) : (
                    previewURL && (
                      <Image
                        src={previewURL}
                        alt="Preview"
                        className="w-[160px] h-[160px] flex justify-start"
                        width={160}
                        height={160}
                      />
                    )
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    name="picture"
                    ref={inputFileRef}
                    className="w-[200px] sm:w-[400px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={onChangeInput}
                  className="w-[200px] sm:w-[400px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Last name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.lastname}
                  onChange={onChangeInput}
                  className="w-[200px] sm:w-[400px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-center">
                <button className="bg-violet-700 text-white text-[16px] font-bold py-2 px-4 rounded hover:bg-violet-800 focus:outline-none focus:shadow-outline">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default AccountSettingsForm;
