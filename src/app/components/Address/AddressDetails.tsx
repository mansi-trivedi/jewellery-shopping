import React, { FormEvent, useCallback, useRef, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "../ui/Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { addNewAddress } from "@/app/data/address";
import { AddressType } from "types/address";
import { Tab, Tabs } from "../ui/Tabs/Tabs";

type SelectAddressProps = {
  addressModal: boolean;
  handleAddressModal: () => void;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressType | undefined>
  >;
  addresses: AddressType[];
};

export type AddressPropsType = {
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

const AddressDetails: React.FC<SelectAddressProps> = (props) => {
  const { handleAddressModal, setSelectedAddress, addresses } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [selectAddress, setSelectAddress] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [errors, setErrors] = useState<AddressPropsType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allAddresses, setAllAddresses] =
    useState<SelectAddressProps["addresses"]>(addresses);

  const handleAddNew = useCallback(() => {
    setIsAddingNew(!isAddingNew);
  }, [isAddingNew]);

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

  const handleSelectAddress = useCallback(
    (addressId: string) => {
      setSelectAddress(addressId);
      const address = addresses.find(
        (address) => address.addressId === addressId
      );
      setSelectedAddress(address);
      handleAddressModal();
    },
    [addresses, handleAddressModal, setSelectedAddress]
  );

  const handleOnFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formRef?.current) {
        setIsLoading(true);
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
        const [apiResp, err] = await addNewAddress(
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
        if (apiResp?.success) {
          setAllAddresses(apiResp?.data ?? []);
        }
        setIsLoading(false);
        toast.success("Address Added successfully", {
          duration: 1000,
        });
      }
      handleAddNew();
    },
    [handleAddNew, validateForm]
  );

  return (
    <div className="tab-container">
      <Tabs
        className="[&>.tab-pills-container]:flex [&>.tab-pills-container]:border-b"
        prefix="address"
      >
        <Tab
          eventKey="new-address"
          title="Add New Address"
          className={`flex-1 bg-transparent [&.active]:!border-none !text-blackShade [&.active]:!border-b-2 [&.active]:bg-darkGreen [&.active]:!text-white rounded-none`}
        >
          <div className="max-h-[350px] overflow-hidden overflow-y-scroll global-scrollbar">
            <form ref={formRef} onSubmit={handleOnFormSubmit}>
              <div className="text-sm p-4 lg:p-8">
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="phone"
                    className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="adressline"
                    className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                  >
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    id="addressline"
                    type="text"
                    name="addressline"
                    placeholder="Flat, House no., Building, Company, Apartment"
                    className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                    required
                  />
                  {errors.addressline && (
                    <p className="text-red-500 text-sm">{errors.addressline}</p>
                  )}
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="area"
                    className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                  >
                    Area, Street, Sector, Village
                  </label>
                  <input
                    id="area"
                    type="text"
                    name="area"
                    placeholder="Area, Street, Sector, Village"
                    className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                    required
                  />
                  {errors.area && (
                    <p className="text-red-500 text-sm">{errors.area}</p>
                  )}
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="landmark"
                    className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                  >
                    Landmark
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                    required
                  />
                  {errors.landmark && (
                    <p className="text-red-500 text-sm">{errors.landmark}</p>
                  )}
                </div>
                <div className="flex my-2 flex-col">
                  <div className="flex flex-col">
                    <label
                      htmlFor="city"
                      className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="City"
                      className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                      required
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="state"
                      className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder="State"
                      className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                      required
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>
                </div>
                <div className="flex my-2 flex-col">
                  <div className="flex flex-col">
                    <label
                      htmlFor="country"
                      className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                    >
                      Country
                    </label>
                    <input
                      id="country"
                      type="text"
                      name="country"
                      placeholder="County"
                      className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                      required
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm">{errors.country}</p>
                    )}
                  </div>
                  <div className="flex flex-col flex-grow  my-2 ">
                    <label
                      htmlFor="postalcode"
                      className="capitalize font-medium text-fluid-micro-lg-1 leading-fluid-micro-lg-1"
                    >
                      Postal Code
                    </label>
                    <input
                      id="postalcode"
                      type="text"
                      name="postalcode"
                      placeholder="Postal Code"
                      className="py-2 px-4 border border-blackShade border-opacity-20 mt-2"
                      required
                    />
                    {errors.postalcode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalcode}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Add Address
                </Button>
              </div>
            </form>
            <LoadingSpinner isLoading={isLoading} />
          </div>
        </Tab>
        <Tab
          eventKey="saved-addresses"
          title="Saved Addresses"
          className={`flex-1 bg-transparent [&.active]:!border-none !text-blackShade [&.active]:!border-b-2 [&.active]:bg-darkGreen [&.active]:!text-white rounded-none`}
        >
          <div className="max-h-[350px] overflow-auto global-scrollbar">
            <div className="p-4 lg:p-8 [&>:not(:nth-last-child(-n+1))]:mb-4">
              {allAddresses?.map((addr) => (
                <div
                  className="flex gap-4 justify-between"
                  key={addr.addressId}
                >
                  <label className="flex items-start mb-2 cursor-pointer">
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
                  <button onClick={undefined} aria-label="remove address">
                    <RiDeleteBin6Fill className="fill-darkGreen" size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AddressDetails;
