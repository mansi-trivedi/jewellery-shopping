"use client";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import MainContent from "@/app/components/MainContent/MainContent";
import Navigation from "@/app/components/Navigation/Navigation";
import OfferHeader from "@/app/components/OfferHeader/OfferHeader";
import { useEffect, useState } from "react";
import { getProductByCategory } from "@/app/data/product";
import { Product } from "@/app/types/productType";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const slug = (await params).slug;
      const data = await getProductByCategory(slug);
      setProducts(data);
    }
    fetchPosts();
  }, [params]);
  return (
    <>
      <OfferHeader />
      <Header />
      <Navigation />
      <MainContent products={products} />
      <Footer />
    </>
  );
}
