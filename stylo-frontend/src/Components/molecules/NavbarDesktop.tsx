import { Link } from "react-router-dom";
import { ShoppingCart } from "@phosphor-icons/react";
import Logo from "../../assets/images/logo.png";
import { HeaderItem, LayoutData } from "../../common/types";
import { FC, useEffect, useState } from "react";

const NavbarDesktop: FC<{ layoutData: LayoutData | null }> = ({
  layoutData,
}) => {
  const [navData, setNavData] = useState<Array<HeaderItem> | null>([]);
  useEffect(() => {
    layoutData && setNavData(layoutData?.layout.header);
  }, [layoutData]);

  return (
    <div className="bg-white p-6 flex items-center justify-between">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
      <ul className="flex gap-6">
        {navData?.map((item) => (
          <Link
            key={item.id}
            to={`/kategorije/${item.name.toLowerCase()}`}
            className="uppercase font-bold text-grey-dark text-lg"
          >
            {item.name}
          </Link>
        ))}
      </ul>
      <Link
        to="/kosarica"
        className="text-grey-dark text-lg font-semibold uppercase"
      >
        <div className="flex justify-end" style={{ width: "177px" }}>
          <ShoppingCart size={32} color="#1443BB" />
        </div>
      </Link>
    </div>
  );
};

export default NavbarDesktop;
