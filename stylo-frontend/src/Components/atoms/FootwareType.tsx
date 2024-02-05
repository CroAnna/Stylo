import { FC, useEffect } from "react";
import { FootwareTypeProps } from "../../common/types";

const FootwareType: FC<{ footwareType: FootwareTypeProps }> = ({
  footwareType,
}) => {
  useEffect(() => {
    // console.log("Podaci u kartici su", footwareType);
  });
  return (
    <div className="relative h-80 lg:h-[350px] xl:h-500">
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={
            `https://${footwareType.url}` || "../../assets/images/no-image.jpg"
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="absolute bottom-1 left-0 m-0 pl-4 text-white w-full box-border font-bold text-2xl bg-black/60 pt-4 pb-4 my-2">
        {footwareType.name.slice(0, -1)}
      </h3>
    </div>
  );
};

export default FootwareType;
