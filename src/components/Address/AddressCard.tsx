import React, { useEffect, useState, useCallback } from "react";
import { AddressAPIProps } from "types/address";
import { getAddresses } from "@/app/data/address";
import toast from "react-hot-toast";
import CustomModal from "components/Modal/Modal";
import { RxCross2 } from "react-icons/rx";
import AddressDetails from "./AddressDetails";

const AddressCard = () => {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<
    Array<AddressAPIProps["addressType"]>
  >([]);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressAPIProps["addressType"]>();

  useEffect(() => {
    (async () => {
      const [addressResp, addressErr] = await getAddresses();
      if (addressErr) {
        toast.error("Not able to fetch addresses, Please try again later");
        return;
      }
      if (addressResp?.success) {
        setAddresses(addressResp?.data ?? []);
        setSelectedAddress(addressResp?.data?.[0]);
      }
    })();
  }, []);

  const handleAddressModal = useCallback(() => {
    setAddressModal((prev) => !prev);
  }, []);

  return (
    <div className="p-4 border w-full bg-cloudGray">
      {selectedAddress ? (
        <>
          <h3 className="text-fluid-body-6 leading-fluid-body-6 font-semibold text-darkBlue">
            Deliver to{" "}
            <span className="font-bold">{selectedAddress.username}</span>
          </h3>
          <p className=" text-blackShade mt-2 font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1">
            {selectedAddress.addressLine}, {selectedAddress.area},{" "}
            {selectedAddress.landmark}, {selectedAddress.city},{" "}
            {selectedAddress.state}, {selectedAddress.country},{" "}
            {selectedAddress.postalCode}
          </p>
          <p className="text-blackShade mb-2">
            <span className="font-semibold">Phone: </span>
            {selectedAddress.phone}
          </p>
        </>
      ) : (
        <p className="text-lg text-blackShade my-2">No Selected Address</p>
      )}
      <p
        className="text-blackShade font-semibold cursor-pointer hover:font-bold underline"
        onClick={handleAddressModal}
      >
        {selectedAddress ? "change" : "select"}
      </p>
      <CustomModal
        isOpen={addressModal}
        contentLabel="add or select address"
        contentStyles={{
          width: "100%",
          maxWidth: "650px",
          padding: 0,
          borderRadius: 0,
        }}
      >
        <div className="modal-content">
          <div className="modal-header px-4 py-3 lg:px-8 lg:py-6 border-b border-b-blackShade border-opacity-20 relative">
            <button
              className="absolute top-0 right-4 lg:right-6 bottom-0"
              type="button"
              onClick={handleAddressModal}
              aria-label="close modal"
            >
              <RxCross2 className="fill-blackShade" size={20} />
            </button>
            <p className="text-fluid-body-5 leading-fluid-body-5 font-semibold capitalize">
              Find your address
            </p>
          </div>
          <AddressDetails
            addressModal={addressModal}
            handleAddressModal={handleAddressModal}
            setSelectedAddress={setSelectedAddress}
            addresses={addresses}
            selectedAddress={selectedAddress}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default AddressCard;
