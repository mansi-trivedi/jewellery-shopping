"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

type CollapsePropsTypes = {
  title: string;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapsePropsTypes> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="overflow-hidden">
      <button type="button" className="w-full" onClick={toggleAccordion}>
        <div className="flex justify-between items-center">
          <p className="text-blackShade font-semibold uppercase text-fluid-micro-lg leading-fluid-micro-lg">
            {title}
          </p>
          <IoIosArrowDown
            size={24}
            className={`fill-blackShade transition-all duration-150 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Collapse;
