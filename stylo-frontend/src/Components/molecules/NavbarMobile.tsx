import { List, ShoppingCart, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderItem, LayoutData } from "../../common/types";
import { FC } from "react";

const NavbarMobile: FC<{ layoutData: LayoutData | null }> = ({
  layoutData,
}) => {
  const [openNav, setOpenNav] = useState(false);

  const [navData, setNavData] = useState<Array<HeaderItem> | null>([]);
  useEffect(() => {
    layoutData && setNavData(layoutData?.layout.header);
  }, [layoutData]);

  const navHandler = () => {
    setOpenNav(!openNav);
  };

  const closeNav = () => {
    setOpenNav(false);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCategoriesPage = location.pathname.startsWith("/kategorije");
  const isProductListPage = location.pathname.startsWith("/proizvodi");
  const isContactPage = location.pathname.startsWith("/kontakt");

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4">
        <List
          onClick={navHandler}
          className={`cursor-pointer ${openNav ? "hidden" : "block"}`}
          size={32}
          color="black"
        />
        <X
          onClick={navHandler}
          className={`cursor-pointer ${openNav ? "block" : "hidden"}`}
          size={32}
          color="black"
        />
        <div className="flex-grow ">
          <h2 className="text-grey-dark font-medium text-lg pl-4">
            {isHomePage
              ? "Početna"
              : isCategoriesPage
              ? "Kategorije"
              : isProductListPage
              ? "Proizvodi"
              : isContactPage
              ? "Kontakt"
              : "Drugo"}
          </h2>
        </div>
      </div>
      <nav className={`p-4 ${openNav ? "block" : "hidden"}`} onClick={closeNav}>
        <ul className="list-none flex flex-col items-center gap-4">
          <li>
            <Link
              to="/"
              className="text-grey-dark text-lg font-semibold uppercase"
            >
              Početna
            </Link>
          </li>
          {navData?.map((item) => (
            <li key={item.id}>
              <Link
                to={`/kategorije/${item.name.toLowerCase()}`}
                className="text-grey-dark text-lg font-semibold uppercase"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/kosarica"
              className="text-grey-dark text-lg font-semibold uppercase"
            >
              {" "}
              <ShoppingCart size={32} color="#1443BB" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarMobile;
