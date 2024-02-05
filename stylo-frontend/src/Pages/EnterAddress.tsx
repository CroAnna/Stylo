import Input from "../Components/atoms/Input";
import Button from "../Components/atoms/Button";
import { useEffect, useState } from "react";
import { redirectToStripe } from "../api/payment";
import { useLocation } from "react-router";
import { ThreeDots } from "react-loader-spinner";
import * as Yup from "yup";

const EnterAddress = () => {
  const [stripeUrl, setStripeUrl] = useState([]);

  const location = useLocation();
  const { cartItems } = location.state;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const transformCartItems = (cartItems) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return cartItems.map((item) => ({
      name: `${item.manufacturer} ${item.model}`,
      quantity: item.quantity,
      priceInCents: item.price * 100,
    }));
  };

  const fetchData = async () => {
    try {
      const transformedCartItems = transformCartItems(cartItems);
      // console.log("Transformirani podaci su", transformedCartItems);
      const response = await redirectToStripe(transformedCartItems);
      setStripeUrl(response.stripe_url);
    } catch (error) {
      console.error("Something is wrong:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [addressData, setAddressData] = useState({
    streetName: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    country: "HR",
  });

  const handleFormSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      // console.log("Url je", stripeUrl);
      if (stripeUrl) {
        localStorage.setItem("addressData", JSON.stringify(addressData));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.href = stripeUrl;
      }
    }
  };

  const [errors, setErrors] = useState<Errors>({});
  interface Errors {
    [key: string]: string;
  }

  const validateForm = () => {
    const validationSchema = Yup.object().shape({
      streetName: Yup.string().required("Unesi ime ulice!"),
      streetNumber: Yup.number()
        .typeError("Unesi ispravan kućni broj")
        .required("Unesi kućni broj!"),
      postalCode: Yup.number()
        .typeError("Unesi ispravan poštanski broj")
        .required("Unesi poštanski broj!"),
      city: Yup.string().required("Unesi grad!"),
    });

    try {
      validationSchema.validateSync(addressData, { abortEarly: false });
      setErrors({} as typeof errors);
      return true;
    } catch (error) {
      const validationErrors: { [key: string]: string } = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleUserAddressChange = (name: string, value: string) => {
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    handleUserAddressChange(name, e.target.value);
  };

  return (
    <>
      {stripeUrl.length > 0 ? (
        <div className="flex justify-center flex-col items-center px-4 gap-4 lg:gap-2 relative py-4">
          <p className="text-xl ">Unesi adresu dostave:</p>

          <div className=" bg-white-light w-full px-6  rounded-lg mb-2  z-10  flex flex-col lg:py-8 max-w-[1200px]">
            <form
              id="addressForm"
              className="flex flex-col  lg:flex-row items-center"
            >
              <div className="flex flex-col gap-5 w-full ">
                <Input
                  value={addressData.streetName}
                  name="streetName"
                  onChange={(e) => handleInputChange(e, "streetName")}
                  type="text"
                  placeholder="Ulica *"
                  error={errors.streetName}
                />
                <Input
                  value={addressData.streetNumber}
                  name="streetNumber"
                  onChange={(e) => handleInputChange(e, "streetNumber")}
                  type="text"
                  placeholder="Kućni broj *"
                  error={errors.streetNumber}
                />{" "}
                <Input
                  value={addressData.postalCode}
                  name="postalCode"
                  onChange={(e) => handleInputChange(e, "postalCode")}
                  type="text"
                  placeholder="Poštanski broj *"
                  error={errors.postalCode}
                />{" "}
                <Input
                  value={addressData.city}
                  name="city"
                  onChange={(e) => handleInputChange(e, "city")}
                  type="text"
                  placeholder="Grad *"
                  error={errors.city}
                />{" "}
                <Input
                  value={addressData.country}
                  name="country"
                  type="text"
                  placeholder="Država *"
                  onChange={() => {}}
                  disabled
                />
              </div>
            </form>
          </div>
          <div className="w-full max-w-[400px] flex-end flex px-6">
            <Button
              form="addressForm"
              onClick={() => {
                handleFormSubmit();
              }}
              type="button"
            >
              Nastavi na plaćanje
            </Button>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#5F83DF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
        </>
      )}
    </>
  );
};

export default EnterAddress;
