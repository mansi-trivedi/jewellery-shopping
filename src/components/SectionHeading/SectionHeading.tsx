import React, { FC } from "react";
import { RiProductHuntLine } from "react-icons/ri";

type HeadingWidgetPropTypes = {
  title: string;
  description: string;
};

const SectionHeading: FC<HeadingWidgetPropTypes> = (props) => {
  const { title, description } = props;

  return (
    <div className="flex items-center flex-col py-10 uppercase">
      <div className="flex gap-2 justify-center items-center ">
        <RiProductHuntLine className="fill-darkGreen" />
        <p
          className="text-purple tracking-wide
        text-fluid-micro-guided leading-fluid-micro-guided font-bold text-darkGreen"
        >
          {title}
        </p>
      </div>
      <p className="description capitalize tracking-wide  text-fluid-h5 leading-fluid-h5 font-semibold text-darkGreen max-w-3xl text-center">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
