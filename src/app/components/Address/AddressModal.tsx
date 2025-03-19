"use client";

import React, {
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { RxCross2 } from "react-icons/rx";
import CustomModal from "components/Modal/Modal";
import Button from "../ui/Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { addNewAddress, getAddresses } from "@/app/data/address";
import { AddressType } from "types/address";

type SelectAddressProps = {
    addressModal: boolean;
    handleAddressModal: () => void;
    setSelectedAddress: React.Dispatch<React.SetStateAction<AddressType | undefined>>
};

type AddressPropsType = {
    name?: string;
    phone?: string;
    addressline?: string;
    area?: string;
    landmark?: string;
    city?: string;
    state?: string;
    country?: string;
    postalcode?: string;
};

const SelectAddressModal: React.FC<SelectAddressProps> = ({
    addressModal,
    handleAddressModal,
    setSelectedAddress
}) => {
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectAddress, setSelectAddress] = useState<string>('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    // const [newAddress, setNewAddress] = useState({ label: "", address: "" });
    const [errors, setErrors] = useState<AddressPropsType>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const [addressResp, addressErr] = await getAddresses();
            if (addressErr) {
                return;
            }
            if (addressResp?.success) {
                setAddresses(addressResp?.data);
            }
        })();
    }, []);

    const handleAddNew = () => {
        setIsAddingNew(!isAddingNew);
    };

    const validateForm = useCallback(
        (
            name: string,
            phone: string,
            addressline: string,
            area: string,
            landmark: string,
            city: string,
            state: string,
            country: string,
            postalcode: string
        ) => {
            const formErrors: AddressPropsType = {};

            if (!name) {
                formErrors.name = "Name is required";
            }
            if (!phone) {
                formErrors.phone = "Phone is required";
            }
            if (!addressline) {
                formErrors.addressline = "Address Line is required";
            }
            if (!area) {
                formErrors.area = "Area is required";
            }
            if (!city) {
                formErrors.city = "City is required";
            }
            if (!landmark) {
                formErrors.landmark = "Landmark is required";
            }
            if (!state) {
                formErrors.state = "State is required";
            }
            if (!country) {
                formErrors.country = "Country is required";
            }
            if (!postalcode) {
                formErrors.postalcode = "Postal Code is required";
            }
            setErrors(formErrors);
            if (Object.keys(formErrors).length !== 0) {
                return false;
            }
            return true;
        },
        []
    );

    const handleSelectAddress = (addressId: string) => {
        setSelectAddress(addressId);
        const address = addresses.find(address => address.addressId === addressId)
        setSelectedAddress(address);
        handleAddressModal();
    }

    const handleOnFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (formRef?.current) {
                // setIsLoading(true);
                const formData = new FormData(formRef.current);
                const name = formData.get("name") as string;
                const phone = formData.get("phone") as string;
                const addressline = formData.get("addressline") as string;
                const area = formData.get("area") as string;
                const landmark = formData.get("landmark") as string;
                const city = formData.get("city") as string;
                const state = formData.get("state") as string;
                const country = formData.get("country") as string;
                const postalcode = formData.get("postalcode") as string;
                const isFormValid = validateForm(
                    name,
                    phone,
                    addressline,
                    area,
                    landmark,
                    city,
                    state,
                    country,
                    postalcode
                );
                if (!isFormValid) {
                    toast.error("Please check form fields and try again");
                    setIsLoading(false);
                    return;
                }
                const [, err] = await addNewAddress(
                    name,
                    phone,
                    addressline,
                    area,
                    landmark,
                    city,
                    state,
                    country,
                    postalcode
                );
                if (err) {
                    toast.error(
                        err.response
                            ? err.response.data?.error
                            : "Not able to register at this moment. Please try again later"
                    );
                    setIsLoading(false);
                    return;
                }
                setIsLoading(false);
                toast.success("Address Added successfully", {
                    duration: 1000,
                });
                // setAddresses([...addresses, {
                //     username: name,
                //     phone,
                //     addressLine: addressline,
                //     area,
                //     landmark,
                //     city,
                //     state,
                //     country,
                //     postalCode: postalcode
                // }])
                handleAddNew();
            }
        },
        [validateForm]
    );

    return (
        <CustomModal isOpen={addressModal} contentLabel="WriteReview">
            <div className="relative">
                <div className="flex justify-between">
                    <p className="text text-lg font-semibold text-darkBlue">
                        Select delivery address
                    </p>
                    <button onClick={handleAddressModal}>
                        <RxCross2 size={20} className="text-darkBlue" />
                    </button>
                </div>
                <hr className="border border-gray-300 my-w" />
                <div className="pt-2">
                    {isAddingNew ? (
                        <div>
                            <div className="flex items-center my-3">
                                <hr className="flex-grow border-gray-300" />
                                <span className="px-4 text-darkBlue text-sm font-semibold">
                                    Add New Address
                                </span>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                            <form ref={formRef} onSubmit={handleOnFormSubmit}>
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="username"
                                        className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        className="py-1 px-2 border border-blackShade"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">{errors.name}</p>
                                    )}
                                </div>
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="phone"
                                        className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        className="py-1 px-2 border border-blackShade"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm">{errors.phone}</p>
                                    )}
                                </div>
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="adressline"
                                        className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                    >
                                        Flat, House no., Building, Company, Apartment
                                    </label>
                                    <input
                                        id="addressline"
                                        type="text"
                                        name="addressline"
                                        placeholder="Flat, House no., Building, Company, Apartment"
                                        className="py-1 px-2 border border-blackShade"
                                        required
                                    />
                                    {errors.addressline && (
                                        <p className="text-red-500 text-sm">{errors.addressline}</p>
                                    )}
                                </div>
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="area"
                                        className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                    >
                                        Area, Street, Sector, Village
                                    </label>
                                    <input
                                        id="area"
                                        type="text"
                                        name="area"
                                        placeholder="Area, Street, Sector, Village"
                                        className="py-1 px-2 border border-blackShade"
                                        required
                                    />
                                    {errors.area && (
                                        <p className="text-red-500 text-sm">{errors.area}</p>
                                    )}
                                </div>
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="landmark"
                                        className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                    >
                                        Landmark
                                    </label>
                                    <input
                                        id="landmark"
                                        type="text"
                                        name="landmark"
                                        placeholder="Landmark"
                                        className="py-1 px-2 border border-blackShade"
                                        required
                                    />
                                    {errors.landmark && (
                                        <p className="text-red-500 text-sm">{errors.landmark}</p>
                                    )}
                                </div>
                                <div className="flex my-2">
                                    <div className="flex flex-col mr-2">
                                        <label
                                            htmlFor="city"
                                            className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                        >
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="py-1 px-2 border border-blackShade"
                                            required
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm">{errors.city}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="state"
                                            className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                        >
                                            State
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            className="py-1 px-2 border border-blackShade"
                                            required
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-sm">{errors.state}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex my-2">
                                    <div className="flex flex-col mr-2">
                                        <label
                                            htmlFor="country"
                                            className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                        >
                                            Country
                                        </label>
                                        <input
                                            id="country"
                                            type="text"
                                            name="country"
                                            placeholder="County"
                                            className="py-1 px-2 border border-blackShade"
                                            required
                                        />
                                        {errors.country && (
                                            <p className="text-red-500 text-sm">{errors.country}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="postalcode"
                                            className="capitalize text-fluid-micro-guided leading-fluid-micro-guided font-medium"
                                        >
                                            Postal Code
                                        </label>
                                        <input
                                            id="postalcode"
                                            type="text"
                                            name="postalcode"
                                            placeholder="Postal Code"
                                            className="py-1 px-2 border border-blackShade"
                                            required
                                        />
                                        {errors.postalcode && (
                                            <p className="text-red-500 text-sm">
                                                {errors.postalcode}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full mt-3">
                                    Add Address
                                </Button>
                            </form>
                        </div>
                    ) : (
                        // Address Selection List
                        <div>
                            <div className="flex items-center my-2">
                                <hr className="flex-grow border-gray-300" />
                                <span className="px-4 text-darkBlue text-sm font-semibold">
                                    Saved Address ({addresses.length})
                                </span>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                            {addresses.map((addr) => (
                                <label
                                    key={addr.addressId}
                                    className="flex items-start mb-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        className="mr-2 mt-2 accent-darkGreen"
                                        value={addr.addressId}
                                        checked={selectAddress === addr.addressId}
                                        onChange={() => handleSelectAddress(addr.addressId)}
                                    />
                                    <div>
                                        <p className="font-semibold text-darkBlue">
                                            {addr.username}
                                        </p>
                                        <p className="text-darkBlue">
                                            {addr.addressLine}, {addr.area}, {addr.landmark},{" "}
                                            {addr.city}, {addr.state}, {addr.country},{" "}
                                            {addr.postalCode}
                                        </p>
                                        <p className="text-darkBlue text-sm">
                                            <span className="font-semibold">Phone: </span>
                                            {addr.phone}
                                        </p>
                                    </div>
                                </label>
                            ))}
                            <div className="flex items-center my-3">
                                <hr className="flex-grow border-gray-300" />
                                <span className="px-4 text-darkBlue text-sm font-semibold">
                                    Add New Address
                                </span>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                            <div>
                                <Button type="submit" className="w-full" onClick={handleAddNew}>
                                    Add Address
                                </Button>
                            </div>
                        </div>
                    )}
                    <LoadingSpinner isLoading={isLoading} />
                </div>
            </div>
        </CustomModal>
    );
};

export default SelectAddressModal;
