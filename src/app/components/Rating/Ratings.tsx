import { useEffect, useState, KeyboardEvent, HTMLAttributes, JSX } from "react";
import Star from "./Star";
import { DetailedHTMLProps } from "react";

interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  isEditable = false,
  rating,
  setRating,
  className,
  ...props
}) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  const hoverHandle = (idx: number) => {
    if (!isEditable) return;
    constructRating(idx);
  };

  const clickHandle = (idx: number) => {
    if (!isEditable || !setRating) return;
    setRating(idx);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>, idx: number) => {
    if (!isEditable || !setRating) return;
    if (e.code !== "Space") return;
    setRating(idx);
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, idx: number) => (
      <Star
        key={idx}
        isFilled={idx < currentRating}
        onMouseEnter={() => hoverHandle(idx + 1)}
        onMouseLeave={() => hoverHandle(rating)}
        onClick={() => clickHandle(idx + 1)}
        className={`${isEditable ? "cursor-pointer focus:outline-none" : ""} ${className || ""
          }`}
        tabIndex={isEditable ? 0 : -1}
        onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) =>
          handleKeyDown(e, idx + 1)
        }
      />
    ));
    setRatingArray(updatedArray);
  };

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <div className={`flex gap-2 ${className || ""}`} {...props}>
      {ratingArray.map((star, idx) => (
        <span key={idx}>{star}</span>
      ))}
    </div>
  );
};

export default Rating;
