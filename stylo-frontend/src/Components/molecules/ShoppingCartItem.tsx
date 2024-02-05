import React, { FC } from "react";
import QuantityCalculator from "../atoms/QuantityCalculator";
import NoImage from "../../assets/images/no-image.jpg";
import { Trash } from "@phosphor-icons/react";
import { notifySuccess } from "../atoms/Toast";
import { CartItem } from "../../common/types";

const ShoppingCartItem: FC<{
  product: CartItem;
  setCartItems: React.Dispatch<React.SetStateAction<Array<CartItem>>>;
}> = ({ product, setCartItems }) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.onerror = null; // prevents looping
    event.currentTarget.src = NoImage;
  };

  const handleRemove = () => {
    setCartItems((prevCartItems: Array<CartItem>) => {
      const updatedCartItems = prevCartItems.filter(
        (item: CartItem) =>
          item.id !== product.id ||
          item.size !== product.size ||
          item.color !== product.color
      );

      notifySuccess("Uklonjeno iz košarice!");
      return updatedCartItems;
    });
  };

  return (
    <>
      {product ? (
        <div className="flex gap-2 lg:gap-4 items-center justify-between px-4">
          <Trash
            size={32}
            className="mr-4 cursor-pointer text-blue-dark"
            onClick={handleRemove}
          />
          <div className="w-32 h-48 lg:w-48 mb-4 lg:bg-white">
            {
              <img
                src={product.image}
                alt="product image"
                className="object-contain h-full w-full"
                onError={handleError}
              />
            }
          </div>
          <div className="flex flex-col lg:flex-row 0">
            <p className="text-lg font-medium w-36 lg:w-96">
              {product.manufacturer} {product.model}, {product.color},{" "}
              {product.size}
            </p>
            <QuantityCalculator setCartItems={setCartItems} product={product} />
            <div className="flex flex-col items-end lg:w-56 ">
              <p className="w-full flex lg:justify-end font-semibold text-xl">
                {(product.price ? product.price * product.quantity : 0).toFixed(
                  2
                )}{" "}
                €
              </p>
              <p className="w-full flex lg:justify-end ml-24">
                1 kom = {product?.price} €
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default ShoppingCartItem;
