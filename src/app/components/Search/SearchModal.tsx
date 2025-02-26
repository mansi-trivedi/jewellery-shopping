import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import Search from "./Search";
// import { Product } from "@/types/productType";

const customStyles = {
  content: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100px",
    backgroundColor: "#F8F8F8",
    padding: "5px 10px",
    border: "none",
    borderRadius: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

type SearchProps = {
  searchModalOpen: boolean;
  handleSearchModal: () => void;
};

const SearchModal: React.FC<SearchProps> = ({
  searchModalOpen,
  handleSearchModal,
}) => {
  useEffect(() => {
    const modalElem = document?.createElement("div");
    modalElem?.setAttribute("id", "__next");
    Modal.setAppElement(modalElem);
  }, []);

  return (
    <>
      <Modal isOpen={searchModalOpen} style={customStyles}>
        <div className="font-bold flex justify-end m-1 p-1">
          <RxCross2 size={20} onClick={handleSearchModal} />
        </div>
        <div className="m-1">
          <Search />
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
