import Wishlist from "@/app/components/Wishlist/Wishlist";
import { useUserContext } from "context/UserContext";

const WishListPage = () => {
  const { isLoggedIn } = useUserContext();
  if (!isLoggedIn) {
    return <p>Please login to view your wishlist</p>;
  }
  return <Wishlist />;
};

export default WishListPage;
