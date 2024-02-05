import { useEffect, useState } from "react";
import MainProductListItem from "../Components/atoms/MainProductListItem";
import ShoeItemSmall from "../Components/atoms/ShoeItemSmall";
import { HomepageData } from "../common/types";
import { getHomepage } from "../api/products";
import Partners from "../assets/images/partners.png";
import { ThreeDots } from "react-loader-spinner";

const Homepage = () => {
  const [homepageContent, setHomepageContent] = useState<HomepageData | null>(
    null
  );

  const shopData = [
    { number: "45", text: "poslovnica" },
    { number: "250+", text: "modela tenisica" },
    { number: "30+", text: "partnera" },
    { number: "10k", text: "kupaca" },
    { number: "180+", text: "modela cipela" },
  ];

  const fetchData = async () => {
    try {
      const content = await getHomepage();
      setHomepageContent(content);
      //console.log(content);
    } catch (error) {
      console.error("Error occured while fetching homepage data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {homepageContent ? (
        <>
          <div className="lg:h-[calc(100vh-104px)]">
            <img
              className="w-full h-full object-cover"
              src={`https://${homepageContent.images[0]["hero-img"].url}`}
              alt="hero-img"
            />
          </div>
          <div className="flex flex-col gap-16 py-4 lg:px-4 max-w-7xl mx-auto md:mt-8 ">
            <div className="flex flex-col-reverse md:flex-row gap-12 ">
              <div className="flex-1">
                <img
                  className="w-full h-full object-cover"
                  src={`https://${homepageContent.images[1]["content-image"].url}`}
                  alt="hero-img"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 p-4 max-w-7xl mx-auto ">
                  <ShoeItemSmall product={homepageContent.products[0]} />
                  <ShoeItemSmall product={homepageContent.products[1]} />
                  <ShoeItemSmall product={homepageContent.products[2]} />
                  <ShoeItemSmall product={homepageContent.products[3]} />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <h3 className="font-bold text-md p-4 lg:p-0  md:text-2xl text-grey-dark">
              Naši partneri
            </h3>
          </div>
          <div className="w-full">
            <img
              className="w-full h-full object-cover mb-8 md:mb-16"
              src={Partners}
              alt="partners-img"
            />
            <img
              className="w-full h-full object-cover"
              src={`https://${homepageContent.images[2]["bottom-banner-image"].url}`}
              alt="bottom-banner-img"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
            <MainProductListItem product={homepageContent.products[4]} />
            <MainProductListItem product={homepageContent.products[5]} />
            <MainProductListItem product={homepageContent.products[6]} />
            <MainProductListItem product={homepageContent.products[7]} />
          </div>
          <div className="flex flex-column w-full p-4 max-w-7xl mx-auto flex-wrap justify-center md:flex-row md:justify-between gap-4">
            {shopData.map((el, index) => (
              <div
                key={index}
                className="rounded-full flex 
                justify-center items-center bg-blue-middle text-center w-[120px] h-[120px] lg:w-[176px] lg:h-[176px] xl:w-[200px] xl:h-[200px] flex-col"
              >
                <p className="font-bold text-3xl lg:text-5xl text-white-light">
                  {el.number}
                </p>
                <p className="lg:font-bold text-lg lg:text-3xl text-white-light">
                  {el.text}
                </p>
              </div>
            ))}
          </div>
        </>
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

export default Homepage;
