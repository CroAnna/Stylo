import { FC } from "react";
import { Product } from "../../common/types";
import { Link } from "react-router-dom";
import NoImage from "../../assets/images/no-image.jpg";

const MainProductListItem: FC<{ product: Product }> = ({ product }) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.onerror = null; // prevents looping
    event.currentTarget.src = NoImage;
  };

  return (
    <Link to={`/proizvodi/${product.id}`}>
      <div className="bg-white w-full p-4 md:p-7">
        <div className="bg-white h-256 w-full mb-4">
          {product ? (
            <img
              src={
                product.images && product.images[0]
                  ? product.images[0]
                  : NoImage
              }
              alt="product image"
              className="object-contain h-full w-full"
              onError={handleError}
            />
          ) : (
            <img
              src={NoImage}
              alt="No Image"
              className="object-contain h-full w-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-grey-dark">{product.manufacturer}</p>
          <h3 className="text-xl text-grey-darker">{product.model}</h3>
          {product.available ? (
            <h4 className="text-green-custom text-md md:text-xl">Dostupno</h4>
          ) : (
            <h4 className="text-red-500 text-md md:text-xl">Nedostupno</h4>
          )}
          <h2 className="text-xl md:text-3xl font-bold text-grey-dark">
            {product.price} €
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MainProductListItem;
