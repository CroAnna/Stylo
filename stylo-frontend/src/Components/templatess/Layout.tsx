import { Outlet } from "react-router";
import Header from "../organisms/Header";
import Footer from "../molecules/Footer";
import { useEffect, useState } from "react";
import { getLayout } from "../../api/products";
import { LayoutData } from "../../common/types";

const Layout = () => {
  const [layoutData, setLayoutData] = useState<LayoutData | null>(null);

  const fetchData = async () => {
    try {
      const data = await getLayout();
      setLayoutData(data);
    } catch (error) {
      console.error("Error occured while fetching layout data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white-light ">
      <Header layoutData={layoutData} />
      <Outlet />
      <Footer layoutData={layoutData} />
    </main>
  );
};

export default Layout;
