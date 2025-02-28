import "@/app/globals.css";
import { ProductProvider } from "context/ProductContext";
import Layout from "components/Layout/Layout";
import { GlobalContextProvider } from "context/GlobalContext";
import { UserProvider } from "context/UserContext";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { quickSand, openSans, robFont } from "@/app/constants/fonts";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

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
        <UserProvider>
          <ProductProvider>
            <Layout>
              <Component {...pageProps} />
              <Toaster
                toastOptions={{
                  success: {
                    style: {
                      background: "green",
                      color: "white",
                    },
                  },
                  error: {
                    style: {
                      background: "red",
                      color: "white",
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
