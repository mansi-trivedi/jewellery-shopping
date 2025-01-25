import React from "react";
import Link from "next/link";
import { menuItems } from "@/constants/menuItems";

const Navigation = () => {
  return (
    <div className="px-5 bg-lightBlue hidden lg:block xl:block 2xl:block 3xl:block">
      <ul className="flex justify-between">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              className="p-2 border-b-4 border-lightBlue text-white hover:border-b-4 hover:border-orange font-semibold text-sm"
            >
              <Link href={item.href} target={item.target}>
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
