import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartItem, Color, Product } from "../common/types";
import Carousel from "../Components/molecules/Carousel";
import ColorItemSelector from "../Components/molecules/ColorItemSelector";
import ShoeSizeSelector from "../Components/molecules/ShoeSizeSelector";
import Button from "../Components/atoms/Button";
import { getProduct } from "../api/products";
import NoImage from "../assets/images/no-image.jpg";
import { colors } from "../common/constants";
import { ThreeDots } from "react-loader-spinner";
import { notifyFailure, notifySuccess } from "../Components/atoms/Toast";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color[]>([]);
  const [selectedSize, setSelectedSize] = useState<number[]>([]);
  const [productSizes, setProductSizes] = useState<number[]>([]);
  const [productColors, setProductColors] = useState<Color[]>([]);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const fetchData = async () => {
    setProductColors([]);
    try {
      const data = await getProduct(id!);
      setProduct(data);
      calculateColors(data.variants);

      setSelectedColor([]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignoreS
      setSelectedColor((prev) => [
        ...prev,
        {
          name: data.variants[0].color,
          hexValue: findColor(data.variants[0].color.toLowerCase()),
        },
      ]);
    } catch (error) {
      console.error("Error occured while fetching layout data:", error);
    }
  };

  const findColor = (name: string) => {
    const color = colors.find((item) => {
      return item.name === name;
    });
    return color?.hexValue;
  };

  const calculateColors = (
    variants: Array<{
      sku: string;
      color: string;
      images: Array<string>;
      sizes: Array<number>;
    }>
  ) => {
    variants.map(
      (variant: {
        sku: string;
        color: string;
        images: Array<string>;
        sizes: Array<number>;
      }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignoreS
        setProductColors((prev) => [
          ...prev,
          {
            name: variant.color,
            hexValue: findColor(variant.color.toLowerCase()),
          },
        ]);
      }
    );
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignoreS

  const calculateSizesBySelectedVariant = (
    varColor: Array<Color>,
    variants: {
      sku: string;
      color: string;
      images: Array<string>;
      sizes: Array<number>;
    }
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignoreS
    const selected = variants.find((item) => {
      return item.color === varColor[0].name;
    });
    setProductSizes([]);
    selected.sizes.map((el: { size: number; quantity: number }) => {
      if (el.quantity > 0) {
        setProductSizes((prev) => [...prev, el.size]);
      }
    });
  };

  useEffect(() => {
    fetchData();
    const storedCart = sessionStorage.getItem("cart");

    if (storedCart !== null) {
      const items = JSON.parse(storedCart);
      setCartItems(items);
    }
  }, []);

  useEffect(() => {
    console.log(selectedColor);
    if (selectedColor.length > 0) {
      setSelectedSize([]);
      if (product) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignoreS
        calculateSizesBySelectedVariant(selectedColor, product.variants);
      }
    }
  }, [selectedColor]);

  useEffect(() => {
    console.log(selectedColor);
    if (selectedColor.length > 0) {
      setSelectedSize([]);
      if (product) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignoreS
        calculateSizesBySelectedVariant(selectedColor, product.variants);
      }
    }
  }, [selectedColor]);

  const handleAddItem = () => {
    console.log(product);

    if (product) {
      const currProduct = {
        id: product.id,
        quantity: 1,
        price: product.price,
        color: selectedColor[0].name,
        size: selectedSize[0],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignoreS
        sku: `${product.variants[selectedVariantIndex]?.sku}-${selectedSize[0]}`, // tu promijeni
      };

      setCartItems((prevCartItems) => {
        console.log(currProduct);

        const newCartItems = [
          ...prevCartItems,

          {
            id: currProduct.id,
            quantity: currProduct.quantity,
            color: currProduct.color,
            size: currProduct.size,
            sku: currProduct.sku,
          },
        ];
        sessionStorage.setItem("cart", JSON.stringify(newCartItems));
        return newCartItems;
      });

      notifySuccess(
        `Uspješno dodan ${product.manufacturer} ${
          product.model
        } u košaricu (${selectedColor[0].name.toLowerCase()}, ${selectedSize})!`
      );
    }
  };

  const checkIfVariantIsInCart = () => {
    let itemFound = false;
    if (cartItems.length > 0) {
      cartItems.forEach((element) => {
        if (
          element.id == product?.id &&
          element.color == selectedColor[0].name &&
          element.size == selectedSize[0]
        ) {
          notifyFailure("Ovaj se proizvod već nalazi u košarici!");
          itemFound = true;
          return;
        }
      });

      if (!itemFound) {
        handleAddItem();
      }
    } else {
      handleAddItem(); // prazna kosarica
    }
  };

  const handleAddToCart = () => {
    checkIfVariantIsInCart();
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col w-full md:px-8 lg:px-0 py-8">
      {product ? (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1 md:max-w-[50%]">
            <Carousel
              images={
                product.variants && product.variants[0].images
                  ? product.variants[0].images
                  : [NoImage]
              }
            />
          </div>
          <div className="flex-1 flex-col flex gap-4 justify-center px-4 md:gap-2">
            <h3 className="text-xl font-medium text-grey-dark">
              {product.manufacturer}
            </h3>
            <p className="text-sm font-medium text-grey-dark capitalize">
              {product.type}
            </p>
            <p className="font-semibold text-3xl">{product.model}</p>
            {
              <div>
                {productColors.map((el, index) => (
                  <span key={index}>
                    {`${el.name} ${
                      index === productColors.length - 1 ? "" : "/"
                    } `}
                  </span>
                ))}
              </div>
            }
            <p className="font-semibold text-4xl">{product.price} €</p>
            <ColorItemSelector
              colors={productColors}
              setSelectedColors={setSelectedColor}
              selectedColors={selectedColor}
              allowMoreSelections={false}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignoreS
              setSelectedVariantIndex={setSelectedVariantIndex}
            />
            <ShoeSizeSelector
              setSelectedShoeSizes={setSelectedSize}
              sizes={productSizes}
              singleSelection={true}
              selectedSizes={selectedSize}
            />

            <div className="max-w-sm mt-4">
              <Button
                onClick={() => {
                  handleAddToCart();
                }}
                disabled={!product.available || selectedSize.length == 0}
              >
                Dodaj u košaricu
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#5F83DF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center" }}
          visible={true}
        />
      )}
    </div>
  );
};

export default ProductDetails;
