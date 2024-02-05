import { useEffect, useState } from "react";
import ShoppingCartItem from "../Components/molecules/ShoppingCartItem";
import Button from "../Components/atoms/Button";
import { getProduct } from "../api/products";
import NoImage from "../assets/images/no-image.jpg";
import { ThreeDots } from "react-loader-spinner";
import { CartItem } from "../common/types";
import { useNavigate } from "react-router";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataAndUpdateCart();
  }, []);

  const fetchData = async (id: string) => {
    try {
      const data = await getProduct(id);
      return data;
    } catch (error) {
      console.error("Error occured while fetching layout data:", error);
    }
  };

  const fetchDataAndUpdateCart = async () => {
    const storedCart = sessionStorage.getItem("cart");

    if (storedCart !== null) {
      const items = JSON.parse(storedCart);

      const updatedItems = await Promise.all(
        items.map(async (item: CartItem) => {
          const productData = await fetchData(item.id);
          // console.log(productData);

          return {
            ...item,
            price: productData.price, // add new attributes to existing object
            manufacturer: productData.manufacturer,
            model: productData.model,
            image: productData.variants[0]?.images[0] || NoImage,
          };
        })
      );
      // console.log(updatedItems);
      setCartItems(updatedItems);
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
    const tempItems = cartItems.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        sku: item.sku,
      };
    });

    sessionStorage.setItem("cart", JSON.stringify(tempItems));
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.map((item: CartItem) => {
      if (item.price) {
        total += item.price * item.quantity;
      }
    });
    setTotalPrice(total.toFixed(2));
  };

  return (
    <div className="max-w-7xl mx-auto flex  flex-col w-full md:px-8 lg:px-0 py-8">
      <div className="justify-end flex">
        <div className="flex justify-around w-[48rem] mb-4">
          <p className="lg:w-56">Proizvod</p>
          <p className="lg:w-48 text-center">Količina</p>
          <p className="lg:w-28 text-end">Cijena</p>
        </div>
      </div>
      <hr />
      <div>
        {!loading ? (
          cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ShoppingCartItem
                key={index}
                product={item}
                setCartItems={setCartItems}
              />
            ))
          ) : (
            <p className="font-semibold text-2xl text-center mt-8">
              Košarica je prazna.
            </p>
          )
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
      <div className="flex items-end flex-col gap-8">
        <div className="w-72 items-end mt-8 ">
          <p className="border-t-2 border-gray-400 text-right pr-4 pt-2 font-bold text-xl">
            Ukupno : {totalPrice} €
          </p>
        </div>
        <div className="mr-4 lg:mr-2">
          <Button
            onClick={() => {
              // console.log(cartItems);
              //console.log(totalPrice);
              !token
                ? navigate("/login")
                : navigate("/unesi-adresu", {
                    state: { cartItems, totalPrice },
                  });
            }}
            disabled={loading || cartItems.length === 0 || !cartItems}
          >
            Nastavi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
