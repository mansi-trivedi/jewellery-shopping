import React, {
  ReactNode,
  ButtonHTMLAttributes,
  memo,
  forwardRef,
} from "react";

type ButtonPropsTypes = {
  children: ReactNode;
  outline?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonPropsTypes>((props, ref) => {
  const { children, className, outline, ...restProps } = props;
  const classes = outline
    ? "bg-transparent text-darkGreen border-darkGreen hover:bg-darkGreen hover:text-white"
    : "bg-darkGreen text-white hover:bg-transparent hover:text-darkGreen hover:border-darkGreen border-transparent";

  return (
    <button
      ref={ref}
      className={`font-bold min-w-28 rounded-sm overflow-hidden border-2 text-fluid-micro-guided leading-fluid-micro-guided transition-all duration-200 py-3 px-7 ${classes} ${
        className ?? ""
      }`}
      {...restProps}
    >
      <span className="inline-flex items-center justify-center">
        {children}
      </span>
    </button>
  );
});

Button.displayName = "Button";

export default memo(Button);
