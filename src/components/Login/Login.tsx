"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useGlobalContext } from "context/GlobalContext";
import CustomModal from "components/Modal/Modal";

type LoginProps = {
  loginModalOpen: boolean;
  handleLoginModal: () => void;
};

type LoginErrorProps = {
  email?: string;
  password?: string;
};

type FormProps = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = ({ loginModalOpen, handleLoginModal }) => {
  const { handleRegisterModalToggle, handleLoginModalToggle } =
    useGlobalContext();
  const [formData, setFormData] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrorProps>({});

  const validateForm = () => {
    const formErrors: LoginErrorProps = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (emailRegex.test(formData.email)) {
      formErrors.email = "Email is invalid.";
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
    }
    setErrors(formErrors);
    console.log("formErrors", formErrors);
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    return true;
  };

  console.log(validateForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User registered:", formData);
    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log("data", data);
    handleLoginModal();
  };

  return (
    <CustomModal isOpen={loginModalOpen} contentLabel="Login">
      <div className="relative">
        <div className="flex justify-between">
          <p className="text text-lg font-semibold text-darkBlue">Login</p>
          <button onClick={handleLoginModalToggle}>
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
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <button
              type="submit"
              className="w-full bg-lightBlue text-white hover:bg-darkBlue my-1 py-2 font-semibold rounded-md mb-3"
            >
              Login
            </button>
            <p className="text-center text-fluid-micro-lg leading-fluid-micro-lg">
              Do not Have Account?
              <span
                className="text-lightBlue hover:underline cursor-pointer"
                onClick={handleRegisterModalToggle}
              >
                {" "}
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default Login;
