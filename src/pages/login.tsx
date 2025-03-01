import Image from "next/image";
import { FC, FormEvent, useCallback, useRef, useState } from "react";
import Button from "@/app/components/ui/Button/Button";
import Link from "next/link";
import { performLoginOperation } from "@/app/data/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import necklaceImg from "@/app/assets/necklaces.jpg";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import { useUserContext } from "context/UserContext";

const Login: FC = () => {
  const { handleUserLoggedInState } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleOnFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formRef?.current) {
        setIsLoading(true);
        const formData = new FormData(formRef.current);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const [response, err] = await performLoginOperation(email, password);

        if (err) {
          setIsLoading(false);
          toast.error("Not able log in. Please try again later");
          return;
        }
        setIsLoading(false);
        if (response?.success) {
          handleUserLoggedInState(true);
          toast.success("User successfully logged in", {
            duration: 1000,
          });
          router.push("/");
        }
      }
    },
    [router, handleUserLoggedInState]
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
          <div className="login-form-container p-10">
            <fieldset>
              <legend className="text-fluid-body-2 leading-fluid-body-2 font-semibold mb-3">
                <h1>Login</h1>
              </legend>
              <form
                ref={formRef}
                onSubmit={handleOnFormSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="py-2 px-4 border border-blackShade"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="mb-2 capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                  >
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="py-2 px-4 border border-blackShade mb-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </fieldset>
            <span className="mt-4 inline-block text-fluid-body-5-guided leading-fluid-body-5-guided">
              Want to register new account ?{" "}
              <Link
                href={"/register"}
                className="underline font-semibold underline-offset-2"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Login;
