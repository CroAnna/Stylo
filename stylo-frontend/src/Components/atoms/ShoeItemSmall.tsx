import { Link } from "react-router-dom";
import { FC } from "react";
import { Product } from "../../common/types";
import NoImage from "../../assets/images/no-image.jpg";

const ShoeItemSmall: FC<{ product: Product }> = ({ product }) => {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.onerror = null; // prevents looping
    event.currentTarget.src = NoImage;
  };

  return (
    <div>
      <Link to={`/proizvodi/${product.id}`}>
        {product ? (
          <img
            src={
              product.images && product.images[0]
                ? product.images[0]
                : NoImage
            }
            alt="product image"
            className="object-contain  w-full"
            onError={handleError}
          />
        ) : (
          <img
            src={NoImage}
            alt="No Image"
            className="object-contain  w-full"
          />
        )}
        <p className="text-center">
          {product.manufacturer} {product.type} {product.model}
        </p>
        <p className="text-xl font-bold text-center">{product.price} €</p>
      </Link>
    </div>
  );
};

export default ShoeItemSmall;
