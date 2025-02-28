import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import womenImg from "@/app/assets/women.jpg";
import FullWidthContainer from "components/FullWidthContainer/FullWidthContainer";

type HeroImagePropsTypes = {
  imageURL?: StaticImageData | string;
};

const HeroImage: FC<HeroImagePropsTypes> = (props) => {
  const { imageURL = womenImg } = props;
  return (
    <FullWidthContainer className="image-container before:content-[''] before:block before:pt-[calc(50%*3/4)]">
      <Image
        src={imageURL}
        fill={true}
        alt="women with rings in her hand"
        className="w-full object-cover max-w-full block"
      />
    </FullWidthContainer>
  );
};

export default HeroImage;
