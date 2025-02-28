import React from "react";
import Link from "next/link";
import { menuItems } from "@/app/constants/menuItems";

const Navigation = () => {
  return (
    <div className="px-5 hidden lg:block box-border bg-cloudGray">
      <ul className="flex justify-center items-center gap-5 xl:gap-8 2xl:gap-11">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              className=" relative text-blueRing uppercase border-b-blueRing hover:cursor-pointer lg:py-4 text-fluid-micro-guided leading-fluid-micro-guided after:content-[''] after:absolute after:left-0 after:right-0 after:h-0.5 after:bg-blueRing after:bottom-0 after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300 font-quickSand px-1 font-medium hover:font-semibold"
            >
              <Link href={item.href} className="block">
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
