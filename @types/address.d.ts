type AddressType = {
  addressId: string;
  phone: string;
  addressLine: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  username: string;
  userId: string;
};

type AddAddressResponse = ServerResponseType<Array<AddressType>>;

export type { AddressType, AddAddressResponse };
