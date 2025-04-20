import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Import star icons

interface StarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  isFilled: boolean;
}

const Star: React.FC<StarProps> = ({
  isFilled = false,
  className,
  ...props
}) => {
  return (
    <span className={className} {...props}>
      {isFilled ? (
        <AiFillStar size={20} color="#FD7E14" /> // Filled star with orange color
      ) : (
        <AiOutlineStar size={20} color="#212121" /> // Outline star with dark color
      )}
    </span>
  );
};

export default Star;
