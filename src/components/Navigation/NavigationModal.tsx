import { menuItems } from "@/constants/menuItems";
import Link from "next/link";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import CustomModal from "../Modal/Modal";

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
    <CustomModal
      isOpen={navigationModalOpen}
      contentStyles={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        padding: "12px",
        borderRadius: "0",
      }}
    >
      <div className="flex justify-end m-2 p-1">
        <RxCross2 size={20} onClick={handleNavigationModal} />
      </div>
      <hr className="border border-gray-200 my-2" />
      <div className="mt-2 flex flex-col">
        <ul>
          {menuItems.map((item, index) => {
            return (
              <li
                key={index}
                className="px-3 py-4 text-darkBlue text-sm hover:border-orange font-semibold"
              >
                <Link href={item.href}>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </CustomModal>
  );
};

export default NavigationModal;
