import React from "react";
import Link from "next/link";
import { menuItems } from "@/app/constants/menuItems";

const Navigation = () => {
  return (
    <div className="px-5 bg-lightBlue hidden lg:block box-border">
      <ul className="flex justify-center items-center gap-5 xl:gap-8 2xl:gap-11">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              className="border-b-2 border-lightBlue text-white hover:border-b-2 hover:border-white font-semibold hover:cursor-pointer lg:py-4 text-fluid-micro-guided leading-fluid-micro-guided"
            >
              <Link href={item.href}>
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
