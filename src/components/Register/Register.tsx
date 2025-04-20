"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import { useGlobalContext } from "context/GlobalContext";
import CustomModal from "components/Modal/Modal";

type RegisterProps = {
  registerModalOpen: boolean;
  handleRegisterModal: () => void;
};

type RegisterErrorProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type FormProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC<RegisterProps> = ({
  registerModalOpen,
  handleRegisterModal,
}) => {
  const { handleLoginModalToggle, handleRegisterModalToggle } =
    useGlobalContext();

  useEffect(() => {
    const modalElem = document?.createElement("div");
    modalElem?.setAttribute("id", "__next");
    Modal.setAppElement(modalElem);
  }, []);

  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterErrorProps>({});

  const validateForm = () => {
    const formErrors: RegisterErrorProps = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (emailRegex.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (passwordRegex.test(formData.password)) {
      formErrors.password =
        "password must contain atleast one upercase letter, one lowercase, one special character and contain at least 8 character";
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.password = "Password and Confrim Password must be equal";
    }

    setErrors(formErrors);
    console.log("formErrors", formErrors);
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (validateForm()) {
      e.preventDefault();
      console.log("User registered:", formData);
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data", data);
      handleRegisterModal();
    }
  };

  return (
    <CustomModal isOpen={registerModalOpen} contentLabel="Register">
      <div className="flex justify-between">
        <p className="text text-lg font-semibold text-darkBlue">Register</p>
        <button onClick={handleRegisterModalToggle}>
          <RxCross2 size={20} className="text-darkBlue" />
        </button>
      </div>

      <div className="pt-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
            autoComplete="off"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
            autoComplete="off"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
          <button
            type="submit"
            className="w-full bg-lightBlue text-white hover:bg-darkBlue my-1 py-2 font-semibold rounded-md mb-3"
          >
            Register
          </button>
          <p className=" text-center text-darkBlue text-fluid-micro-lg leading-fluid-micro-lg">
            Already have an account?
            <span
              className="text-lightBlue hover:underline cursor-pointer"
              onClick={handleLoginModalToggle}
            >
              {" "}
              Sign In
            </span>
          </p>
        </form>
      </div>
    </CustomModal>
  );
};

export default Register;
