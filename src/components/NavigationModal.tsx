import { menuItems } from "@/constants/menuItems";
import Link from "next/link";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";

const customStyles = {
  content: {
    left: "auto",
    right: 0,
    top: 0,
    width: "40%",
    height: "100%",
    backgroundColor: "#F8F8F8",
    padding: "5px",
    border: "none",
    borderRadius: "none",
    boxShadow: "-4px 0 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
};

type NavigationProps = {
  navigationModalOpen: boolean;
  handleNavigationModal: () => void;
};

const NavigationModal: React.FC<NavigationProps> = ({
  navigationModalOpen,
  handleNavigationModal,
}) => {
  useEffect(() => {
    const modalElem = document?.createElement("div");
    modalElem?.setAttribute("id", "__next");
    Modal.setAppElement(modalElem);
  }, []);

  return (
    <>
      <Modal isOpen={navigationModalOpen} style={customStyles}>
        <div className="font-bold flex justify-end m-1 p-1">
          <RxCross2 size={20} onClick={handleNavigationModal} />
        </div>
        <hr className="border border-gray-200 mt-1" />
        <div className="mt-2">
          <ul className="max-h-[330px] overflow-y-auto overflow-visible">
            {menuItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="p-3 text-darkBlue text-sm hover:border-orange font-semibold"
                >
                  <Link href={item.href} target={item.target}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default NavigationModal;
