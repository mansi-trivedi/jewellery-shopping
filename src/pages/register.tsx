import Image from "next/image";
import { FC, FormEvent, useCallback, useRef, useState } from "react";
import Button from "@/app/components/ui/Button/Button";
import Link from "next/link";
import { performUserRegistration } from "@/app/data/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import necklaceImg from "@/app/assets/necklaces.jpg";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

type RegisterErrorProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
};

const Register: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<RegisterErrorProps>({});
  const router = useRouter();

  const validateForm = useCallback(
    (email: string, password: string, cPassword: string, firstname: string, lastname: string) => {
      const formErrors: RegisterErrorProps = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (!firstname) {
        formErrors.firstname = "Firstname is required";
      }

      if (!lastname) {
        formErrors.lastname = "Lastname is required";
      }

      if (!email) {
        formErrors.email = "Email is required";
      } else if (!emailRegex.test(email)) {
        formErrors.email = "Email is invalid";
      }

      if (!password) {
        formErrors.password = "Password is required";
      } else if (passwordRegex.test(password)) {
        formErrors.password =
          "password must contain at least one uppercase letter, one lowercase, one special character and contain at least 8 character";
      }

      if (!cPassword) {
        formErrors.confirmPassword = "Confirm Password is required";
      } else if (password !== cPassword) {
        formErrors.password = "Password and confirm Password must be equal";
      }
      setErrors(formErrors);
      if (Object.keys(formErrors).length !== 0) {
        return false;
      }
      return true;
    },
    []
  );

  const handleOnFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formRef?.current) {
        setIsLoading(true);
        const formData = new FormData(formRef.current);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cPassword = formData.get("confirm-password") as string;
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const isFormValid = validateForm(email, password, cPassword, firstname, lastname);
        if (!isFormValid) {
          toast.error("Please check form fields and try again");
          setIsLoading(false);
          return;
        }
        const [, err] = await performUserRegistration(email, password, lastname, firstname);
        if (err) {
          toast.error(
            err.response
              ? err.response.data?.error
              : "Not able to register at this moment. Please try again later"
          );
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        toast.success("User registered successfully", {
          duration: 1000,
        });
        router.push("/login");
      }
    },
    [router, validateForm]
  );

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="min-h-[400px] max-w-6xl bg-white mx-auto shadow-lg rounded-xl overflow-hidden relative">
        <div className="grid lg:grid-cols-[50%_50%]">
          <div className="banner-container hidden lg:flex">
            <div className="imageBlock w-full relative overflow-hidden before:content-[''] before:block before:pt-[calc(45%*16/9)] bg-badgeShade">
              <Image
                className="w-full border object-cover mix-blend-hard-light block"
                src={necklaceImg}
                alt="product"
                fill={true}
              />
            </div>
          </div>
          <div className="registration-form-container p-10">
            <fieldset>
              <legend className="text-fluid-body-2 leading-fluid-body-2 font-semibold mb-3">
                <h1>Registration</h1>
              </legend>
              <form
                ref={formRef}
                onSubmit={handleOnFormSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="firstname"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    Firstname
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="Enter your firstname"
                    className="py-2 px-4 border border-blackShade"
                    required
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="lastname"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    Lastname
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Enter your lastname"
                    className="py-2 px-4 border border-blackShade"
                    required
                  />
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="py-2 px-4 border border-blackShade"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="py-2 px-4 border border-blackShade mb-2"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    placeholder="Re-Enter your password"
                    className="py-2 px-4 border border-blackShade mb-2"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Button type="submit">Register</Button>
                </div>
              </form>
            </fieldset>
            <span className="mt-4 inline-block text-fluid-body-5-guided leading-fluid-body-5-guided">
              Already have an account ?{" "}
              <Link
                href={"/login"}
                className="underline font-semibold underline-offset-2"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Register;
