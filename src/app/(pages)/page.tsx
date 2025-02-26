import MainContent from "components/MainContent/MainContent";
import { getAllProduct } from "@/app/data/product";

export default async function Page() {
  const response = await getAllProduct();

  if (!response.success) {
    return <p>Product does not exist</p>;
  }

  return <MainContent products={response?.data ?? []} />;
}
