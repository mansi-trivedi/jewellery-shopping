type AddressDetails = {
  recipient_name: string;
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
};

function extractAddressDetails(paypalResponse): AddressDetails {
  try {
    // 1. Attempt to get shipping address (priority)
    const shipping = paypalResponse.purchase_units?.[0]?.shipping;
    if (shipping) {
      return {
        recipient_name: shipping.name?.full_name || "",
        address_line_1: shipping.address?.address_line_1 || "",
        address_line_2: shipping.address?.address_line_2 || "",
        admin_area_2: shipping.address?.admin_area_2 || "",
        admin_area_1: shipping.address?.admin_area_1 || "",
        postal_code: shipping.address?.postal_code || "",
        country_code: shipping.address?.country_code || "",
      };
    }

    // 2. If no shipping address, try to get the payer address
    const payerAddress = paypalResponse.payer?.address;
    if (payerAddress) {
      return {
        recipient_name:
          paypalResponse.payer?.name?.given_name +
          " " +
          paypalResponse.payer?.name?.surname,
        address_line_1: "", // Payer address usually doesn't have address_line_1
        address_line_2: "",
        admin_area_2: "",
        admin_area_1: "",
        postal_code: "",
        country_code: payerAddress.country_code || "",
      };
    }

    // 3. If no address is found, return an empty object.  This is better than returning null.
    return {
      recipient_name: "",
      address_line_1: "",
      address_line_2: "",
      admin_area_2: "",
      admin_area_1: "",
      postal_code: "",
      country_code: "",
    };
  } catch (error) {
    console.error("Error extracting address details:", error);
    return {
      recipient_name: "",
      address_line_1: "",
      address_line_2: "",
      admin_area_2: "",
      admin_area_1: "",
      postal_code: "",
      country_code: "",
    };
  }
}

export { extractAddressDetails };
