import Image from "next/image";
import { FiHeart } from "react-icons/fi";
// import rings from "../../public/assets/rings.jpg";

interface ProductCardProps {
  image: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  description,
}) => {
  return (
    <div className="relative">
      <div className="p-1 border rounded-lg shadow-md h-[280px] bg-offWhite hover:border-orange hover:border-2">
        <Image
          className="w-full h-48 object-cover rounded-t-lg border"
          src={image}
          alt="product"
          width={200}
          height={200}
        />
        <div className="p-2">
          <p className="text-sm text-darkBlue">{description}</p>
          <p className="font-semibold text-darkBlue">{`Rs. ${price}`}</p>
        </div>
      </div>
      <div>
        <FiHeart className="absolute top-3 left-3 w-5 h-5 cursor-pointer text-red-600 fill-white hover:text-red-600 hover:fill-red-600" />
      </div>
    </div>
  );
};

export default ProductCard;
