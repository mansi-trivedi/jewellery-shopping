import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Navigation from "@/components/Navigation";
import OfferHeader from "@/components/OfferHeader";

export default function Page() {
  return (
    <>
      <OfferHeader />
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
    </>
  );
}
