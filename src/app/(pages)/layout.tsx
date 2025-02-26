import "@/app/globals.css";
import type { Metadata } from "next";
import { quickSand, openSans, robFont } from "@/app/constants/fonts";
import { UserProvider } from "@/app/contexts/UserContext";
import { GlobalContextProvider } from "@/app/contexts/GlobalContext";
import Navigation from "components/Navigation/Navigation";
import OfferHeader from "components/OfferHeader/OfferHeader";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "app name",
  description: "app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quickSand.variable} ${openSans.variable} ${robFont.variable}`}
    >
      <body>
        <GlobalContextProvider>
          <UserProvider>
            <OfferHeader />
            <Header />
            <Navigation />
            <main className="container max-w-none mx-auto">{children}</main>
            <Footer />
          </UserProvider>
        </GlobalContextProvider>
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
      </body>
    </html>
  );
}
