"use client";

import React, { FC, ReactNode, ButtonHTMLAttributes, memo } from "react";

type ButtonPropsTypes = {
  children: ReactNode;
  outline?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonPropsTypes> = (props) => {
  const { children, className, outline, ...restProps } = props;
  const classes = outline
    ? "bg-transparent text-darkGreen border-darkGreen hover:bg-darkGreen hover:text-white"
    : "bg-darkGreen text-white hover:bg-transparent hover:text-darkGreen hover:border-darkGreen";

  return (
    <button
      className={`font-bold min-w-28 rounded-sm overflow-hidden border-2 text-fluid-micro-guided leading-fluid-micro-guided transition-all duration-200 ${classes} ${
        className ?? ""
      }`}
      {...restProps}
    >
      <span className="inline-flex items-center justify-center py-3 px-7">
        {children}
      </span>
    </button>
  );
};

export default memo(Button);
