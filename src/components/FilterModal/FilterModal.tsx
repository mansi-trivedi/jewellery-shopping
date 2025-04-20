import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
// import Dropdown from "components/Dropdown/Dropdown";
import CustomModal from "components/Modal/Modal";

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
  overlay: {
    justifyContent: "flex-end",
  },
};

const categoryOptions = ["Rings", "Anklets", "Bracelets", "Necklaces"];

const priceOptions = [
  { label: "Below 10,000", value: "0-10000" },
  { label: "10,000 - 20,000", value: "10000-20000" },
  { label: "20,000 - 30,000", value: "20000-30000" },
];

type NavigationProps = {
  filterModalOpen: boolean;
  handleFilterModal: () => void;
};

const FilterModal: React.FC<NavigationProps> = ({
  filterModalOpen,
  handleFilterModal,
}) => {
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const applyFilters = () => {
    console.log("Applied Filters:", { priceFilter, categoryFilter });
    // Add your logic to apply filters
  };

  const clearFilters = () => {
    setPriceFilter(null);
    setCategoryFilter(null);
  };

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  return (
    <>
      <CustomModal
        isOpen={filterModalOpen}
        contentStyles={{
          ...customStyles.content,
        }}
        overlayStyles={{
          ...customStyles.overlay,
        }}
      >
        <div className="relative h-full flex flex-col overflow-y-scroll">
          <div className="flex justify-between m-2 p-1">
            <p className="text text-lg font-semibold">Filter</p>
            <RxCross2 size={20} onClick={handleFilterModal} />
          </div>
          <hr className="border border-gray-300 my-1" />
          {/* Price Filter */}
          <div className="cursor-pointer flex flex-col">
            <div className="my-2">
              <div
                onClick={() => setShowPriceOptions(!showPriceOptions)}
                className="flex justify-between p-2 font-medium"
              >
                Price
                <span className="text-lg font-medium text-darkBlue">
                  {showPriceOptions ? "-" : "+"}
                </span>
              </div>
              {showPriceOptions && (
                <div className="mt-2 mx-3 space-y-2">
                  {priceOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={priceFilter === option.value}
                        onChange={() => setPriceFilter(option.value)}
                        className="w-4 h-4"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-1" />
            {/* Product Category Filter */}
            <div className="my-2">
              <div
                onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                className="flex justify-between p-2 font-medium"
              >
                Category
                <span className="text-lg font-medium text-darkBlue">
                  {showPriceOptions ? "-" : "+"}
                </span>
              </div>
              {showCategoryOptions && (
                <div className="mt-2 mx-3 space-y-2">
                  {categoryOptions.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={categoryFilter === category}
                        onChange={() => setCategoryFilter(category)}
                        className="w-4 h-4"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-1" />
            <div className="my-2 lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
              <div className="flex justify-between p-2 font-medium">
                <span className="text-lg font-medium text-darkBlue">
                  Sort By
                </span>
                {/* <Dropdown /> */}
              </div>
            </div>
            <hr className="border border-gray-200 my-1 lg:hidden xl:hidden 2xl:hidden 3xl:hidden" />
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-auto mx-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-400 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-lightBlue text-white rounded-lg font-semibold hover:bg-darkBlue"
            >
              Apply
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default FilterModal;
