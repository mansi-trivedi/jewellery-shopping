import React, { useEffect, useState } from "react";
import SelectAddressModal from "./AddressModal";
import { AddressType } from "types/address";
import { getAddresses } from "@/app/data/address";

const AddressCard = () => {
    const [addressModal, setAddressModal] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressType>();

    useEffect(() => {
        (async () => {
            const [addressResp, addressErr] = await getAddresses();
            if (addressErr) {
                return;
            }
            if (addressResp?.success) {
                console.log("addressResp?.data", addressResp?.data)
                setAddresses(addressResp?.data ?? []);
                setSelectedAddress(addressResp?.data?.[0])
            }
        })();
    }, []);

    const handleAddressModal = () => {
        setAddressModal(!addressModal);
    };
    return (
        <div className="p-4 border w-full max-w-md bg-cloudGray">
            {selectedAddress ? (
                <>
                    <h3 className="text-lg font-semibold text-darkBlue">
                        Deliver to <span className="font-bold">{selectedAddress.username}</span>
                    </h3>
                    <p className=" text-darkBlue mt-2">
                        {selectedAddress.addressLine}, {selectedAddress.area}, {selectedAddress.landmark},{" "}
                        {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country},{" "}
                        {selectedAddress.postalCode}
                    </p>
                    <p className="text-darkBlue mb-2">
                        <span className="font-semibold">Phone: </span>
                        {selectedAddress.phone}
                    </p>
                </>
            ) : (
                <p className="text-lg text-darkBlue my-2">No Selected Address</p>
            )}
            <p
                className="text-darkGreen font-semibold cursor-pointer hover:font-bold underline"
                onClick={handleAddressModal}
            >
                {selectedAddress ? 'change' : 'select'}
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
