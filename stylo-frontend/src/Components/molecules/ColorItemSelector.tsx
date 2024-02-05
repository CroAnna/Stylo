import { FC, useEffect } from "react";
import { Color, ColorItemSelectorProps } from "../../common/types";

const ColorItemSelector: FC<ColorItemSelectorProps> = ({
  isGrid = false,
  setSelectedColors,
  selectedColors,
  colors,
  allowMoreSelections = true,
  setSelectedVariantIndex,
}) => {
  const isAlreadySelected = (el: Color) => {
    return selectedColors.some((item) => item.name === el.name);
  };

  const handleClick = (el: Color, index: number) => {
    setSelectedVariantIndex(index);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignoreS
    setSelectedColors((prev) => {
      if (isAlreadySelected(el)) {
        return prev.filter((item) => item.name !== el.name);
      } else {
        if (allowMoreSelections) {
          return [...prev, el];
        } else {
          return [el];
        }
      }
    });
  };

  useEffect(() => {
    // console.log(selectedColors);
  }, [selectedColors]);

  return (
    <div className={`gap-4 ${isGrid ? "grid grid-cols-3" : "flex"}`}>
      {colors.map((el, index) => (
        <div
          key={el.name}
          className={`w-10 h-10 cursor-pointer rounded-lg border border-black 
          ${
            isAlreadySelected(el)
              ? "border-0 border-blue-middle outline outline-6 outline-blue-middle"
              : ""
          }`}
          style={{ backgroundColor: el.hexValue }}
          onClick={() => handleClick(el, index)}
        ></div>
      ))}
    </div>
  );
};

export default ColorItemSelector;
