import FootwareType from "../Components/atoms/FootwareType";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductCategories } from "../api/product_categories";
import { ProductCategory } from "../common/types";
import { ThreeDots } from "react-loader-spinner";

const ProductListCategories = () => {
  const [productCategories, setProductCategories] = useState<
    ProductCategory[] | undefined
  >();

  const fetchData = async () => {
    try {
      const data = await getProductCategories(type!);
      setProductCategories(data);
    } catch (error) {
      console.error("Error occured while fetching layout data:", error);
    }
  };

  const { type } = useParams();

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div>
      {productCategories === undefined ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#5F83DF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center" }}
          visible={true}
        />
      ) : productCategories?.length === 0 ? (
        <h1 className="max-w-7xl mx-auto pt-4">Nema kategorija</h1>
      ) : (
        <div className="flex flex-col gap-6 max-w-[100rem] mx-auto p-4 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2">
          {productCategories?.map((footware, index) => (
            <Link
              to={`/proizvodi/${type}/${footware.name
                .slice(0, -1)
                .toLowerCase()}`}
              key={index}
            >
              <FootwareType footwareType={footware} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListCategories;
