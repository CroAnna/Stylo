import { useEffect, useState, FC } from "react";
import NavbarDesktop from "../molecules/NavbarDesktop";
import NavbarMobile from "../molecules/NavbarMobile";
import { HeaderItem, LayoutData } from "../../common/types";

const Header: FC<{ layoutData: LayoutData | null }> = ({ layoutData }) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  const [headerData, setHeaderData] = useState<Array<HeaderItem> | null>([]);

  useEffect(() => {
    layoutData && setHeaderData(layoutData?.layout.header);
  }, [layoutData]);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <div className="header-wrapper">
      {isDesktop ? (
        <NavbarDesktop layoutData={layoutData} />
      ) : (
        <NavbarMobile layoutData={layoutData} />
      )}
    </div>
  );
};

export default Header;
