import { FC, ReactNode } from "react";
import OfferHeader from "components/OfferHeader/OfferHeader";
import Header from "components/Header/Header";
import Navigation from "components/Navigation/Navigation";
import Footer from "components/Footer/Footer";

type LayoutPropTypes = {
  children: ReactNode;
};

const Layout: FC<LayoutPropTypes> = ({ children }) => {
  return (
    <div>
      <OfferHeader />
      <Header />
      <Navigation />
      <main className="container max-w-none mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
