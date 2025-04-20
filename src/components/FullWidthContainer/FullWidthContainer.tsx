import React, { ReactNode, FC } from "react";

type FullWidthContainerPropsTypes = {
  children: ReactNode;
  className?: string;
};
const FullWidthContainer: FC<FullWidthContainerPropsTypes> = (props) => {
  const { children, className } = props;
  return (
    <div
      className={`relative overflow-hidden -ml-[35px] -mr-[35px] md:-ml-[45px] md:-mr-[45px] xl:-ml-[56px] xl:-mr-[56px] 2xl:-ml-[72px] 2xl:-mr-[72px] 3xl:-ml-[96px] 3xl:-mr-[96px] ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default FullWidthContainer;
