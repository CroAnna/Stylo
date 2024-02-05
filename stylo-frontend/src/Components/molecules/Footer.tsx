import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { FooterItem, LayoutData } from "../../common/types";
import { FC, useEffect, useState } from "react";
import { deleteUser } from "../../api/users";
import { notifyFailure, notifySuccess } from "../atoms/Toast";
import Swal from "sweetalert2";

const Footer: FC<{ layoutData: LayoutData | null }> = ({ layoutData }) => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));

  function parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const [footerData, setFooterData] = useState<Array<FooterItem> | null>([]);

  const deleteAccount = async (userId: string) => {
    try {
      const response = await deleteUser(userId);
      console.log(response);
      localStorage.removeItem("token");
      setJwtToken(null);
      notifySuccess("Vaš je račun uspješno izbrisan!");
    } catch (error) {
      console.error(`Error occured while deleting user ${userId}:`, error);
      notifyFailure("Greška pri brisanju računa.");
    }
  };

  const handleClick = () => {
    if (jwtToken) {
      Swal.fire({
        title: "Jeste li sigurni?",
        text: "Ova radnja je destruktivna!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Odustani",
        confirmButtonText: "Da, obriši moj račun!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const decoded = parseJwt(jwtToken);
          // console.log(decoded);
          deleteAccount(decoded.sub);
          Swal.fire("Obrisano!", "Vaš je račun izbrisan.", "success");
        }
      });
    }
  };

  useEffect(() => {
    layoutData && setFooterData(layoutData?.layout.footer.footerContent.data);
  }, [layoutData]);

  return (
    <div className="w-full mt-auto bg-grey-dark justify-center flex flex-col gap-4">
      <div className="max-w-7xl mx-auto flex flex-col p-4 w-full justify-between bg-grey-dark text-white-light md:px-8 lg:px-4 md:flex-row">
        {footerData
          ? footerData.map((el: FooterItem) => (
              <div key={el.title} className="flex flex-col gap-4">
                <h2 className="font-bold uppercase font text-lg flex flex-wrap mt-4">
                  {el.title}
                </h2>
                {el.type == "links" && (
                  <ul className="flex flex-col gap-2">
                    {el.content.map((item, index) => (
                      <li key={index}>
                        <Link to={item.url}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                {el.type == "social" && (
                  <ul className="flex gap-4 justify-center md:justify-normal">
                    {el.content.map((item, index) => (
                      <Link to={item.url} target="_blank" key={index}>
                        <div
                          key={index}
                          className="rounded-full bg-blue-middle w-fit p-2"
                        >
                          {item.text == "facebook-logo" && (
                            <FacebookLogo size={32} color="#242424" />
                          )}
                          {item.text == "instagram-logo" && (
                            <InstagramLogo size={32} color="#242424" />
                          )}
                          {item.text == "youtube-logo" && (
                            <YoutubeLogo size={32} color="#242424" />
                          )}
                        </div>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ))
          : null}
      </div>
      <div className="max-w-7xl mx-auto flex justify-end p-4 w-full cursor-pointer bg-grey-dark text-white-light md:px-8 lg:px-4 md:flex-row">
        {jwtToken && <div onClick={handleClick}>Obriši moj račun</div>}
      </div>
    </div>
  );
};

export default Footer;
