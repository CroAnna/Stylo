import { useState, useEffect } from "react";
import Filter from "../Components/molecules/Filter";
import { getFilteredProducts } from "../api/products";
import { useParams } from "react-router";
import MainProductListItem from "../Components/atoms/MainProductListItem";
import { Color, Product } from "../common/types";
import { ThreeDots } from "react-loader-spinner";

const ProductList = () => {
  const { gender } = useParams();
  const { type } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >();

  useEffect(() => {
    // This effect will be triggered whenever filteredProducts changes
    // console.log("Filtered products changed:", filteredProducts);
  }, [filteredProducts]);

  const fetchData = async () => {
    try {
      const data = await getFilteredProducts(gender!, type!);
      setFilteredProducts(data);
      // console.log(filteredProducts);
    } catch (error) {
      console.error("Error occured while fetching layout data:", error);
    }
  };

  const fetchDataWithFilter = async (
    selectedShoeSizes?: number[],
    selectedColors?: Color[]
  ) => {
    try {
      const data = await getFilteredProducts(
        gender!,
        type!,
        selectedShoeSizes.length > 0 ? selectedShoeSizes : undefined, //they can be undefined because they are not required
        selectedColors.length > 0 ? selectedColors[0].name : undefined
      );
      setFilteredProducts(data);
      // console.log(filteredProducts);
      // console.log(
      //   "Parametri su mi",
      //   gender,
      //   type,
      //   selectedShoeSizes,
      //   selectedColors
      // );
    } catch (error) {
      console.error("Error occurred while fetching layout data:", error);
    }
  };

  const applyFilter = (
    selectedColors: Color[],
    selectedShoeSizes: number[]
  ) => {
    // console.log("Selected Colors:", selectedColors);
    // console.log("Selected Shoe Sizes:", selectedShoeSizes);

    fetchDataWithFilter(selectedShoeSizes, selectedColors);
  };

  return (
    <div>
      <Filter onApplyFilter={applyFilter} />
      {filteredProducts === undefined ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#5F83DF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center" }}
          visible={true}
        />
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <h1 className="w-full">Nema proizvoda koji odgovaraju filteru</h1>
          ) : (
            filteredProducts.map((product) => (
              <MainProductListItem key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
