import axios from "axios";

const getToken = async () => {
  const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const response = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  return response.data.access_token;
};

export default getToken;
