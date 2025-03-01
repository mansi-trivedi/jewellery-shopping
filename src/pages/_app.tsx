import "@/app/globals.css";
import { ProductProvider } from "context/ProductContext";
import Layout from "components/Layout/Layout";
import { GlobalContextProvider } from "context/GlobalContext";
import { UserProvider } from "context/UserContext";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { quickSand, openSans, robFont } from "@/app/constants/fonts";
import { parseCookies } from "@/app/utils/cookie";
import { NextPageContext } from "next";

type MyAppPropsTypes = {
  isAuthenticated: boolean;
} & AppProps;

const MyApp = (props: MyAppPropsTypes) => {
  const { Component, pageProps, isAuthenticated } = props;

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${quickSand.style.fontFamily},
            ${openSans.style.fontFamily}, ${robFont.style.fontFamily},
            "sans-serif";
        }
      `}</style>
      <GlobalContextProvider>
        <UserProvider
          value={{
            isAuthenticated: isAuthenticated,
          }}
        >
          <ProductProvider>
            <Layout>
              <Component {...pageProps} />
              <Toaster
                position="top-right"
                toastOptions={{
                  success: {
                    iconTheme: {
                      primary: "#516559",
                      secondary: "white",
                    },
                    style: {
                      background: "#516559",
                      color: "white",
                      padding: "10px",
                      borderRadius: "0",
                      fontSize: "16px",
                      fontWeight: "500",
                    },
                  },
                  error: {
                    style: {
                      background: "red",
                      color: "white",
                      padding: "10px",
                      borderRadius: "0",
                    },
                  },
                }}
              />
            </Layout>
          </ProductProvider>
        </UserProvider>
      </GlobalContextProvider>
    </>
  );
};

export default MyApp;

MyApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  let isAuthenticated = false;
  const cookies = parseCookies(ctx?.req?.headers.cookie || "");
  if (cookies["authToken"]) {
    isAuthenticated = true;
  }
  return {
    isAuthenticated: isAuthenticated,
  };
};
