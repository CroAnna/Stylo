import { useEffect } from "react";
import { addOrder } from "../api/orders";

const PaymentSuccess = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cartItems = JSON.parse(sessionStorage.getItem("cart"));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const addressData = JSON.parse(localStorage.getItem("addressData"));
  const token = localStorage.getItem("token");

  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const userId = decodedToken ? decodedToken.sub : null;
  const userEmail = decodedToken ? decodedToken.email : null;
  ("");

  const handleSubmit = async () => {
    try {
      const formattedData = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cart: cartItems.map((item) => ({
          id: item.sku,
          quantity: item.quantity,
        })),

        customerId: userId,
        customerEmail: userEmail,
        shippingAddress: {
          streetName: addressData.streetName,
          streetNumber: addressData.streetNumber,
          postalCode: addressData.postalCode,
          city: addressData.city,
          country: addressData.country,
        },
      };

      const response = await addOrder(formattedData);
      console.log("Narudzba dodana", response);
      localStorage.removeItem("addressData");
      sessionStorage.removeItem("cart");
    } catch (error) {
      console.log("Nešto je pošlo po krivu", error);
    }
  };
  useEffect(() => {
    handleSubmit();
  });

  return (
    <div className="flex items-center justify-center h-screen bg-white-light">
      <h1 className="text-gray-dark font-bold text-6xl text-center">
        Uspješno ste izvršili plaćanje te je vaša narudžba u obradi. Na mail
        ćete dobiti račun.
      </h1>
    </div>
  );
};

export default PaymentSuccess;
