import React, { useEffect, useState, useCallback } from "react";
import SelectAddressModal from "./AddressModal";
import { AddressType } from "types/address";
import { getAddresses } from "@/app/data/address";
import toast from "react-hot-toast";

const AddressCard = () => {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressType>();

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
      <SelectAddressModal
        addressModal={addressModal}
        handleAddressModal={handleAddressModal}
        setSelectedAddress={setSelectedAddress}
        addresses={addresses}
      />
    </div>
  );
};

export default AddressCard;
