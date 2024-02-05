import React, { useEffect } from "react";
import { ShoeSizeSelectorProps } from "../../common/types";

const ShoeSizeSelector: React.FC<ShoeSizeSelectorProps> = ({
  setSelectedShoeSizes,
  isGrid = true,
  singleSelection = false,
  sizes,
  selectedSizes,
}) => {
  const handleSizeChange = (size: number) => {
    setSelectedShoeSizes((prevSizes) =>
      singleSelection
        ? [size]
        : prevSizes.includes(size)
        ? prevSizes.filter((item) => item !== size)
        : [...prevSizes, size]
    );
  };

  useEffect(() => {
    setSelectedShoeSizes(selectedSizes);
  }, [selectedSizes, setSelectedShoeSizes]);

  return (
    <div className={`gap-1  w-fit ${isGrid ? "grid grid-cols-5" : "flex"}  `}>
      {sizes.map((size) => (
        <div
          key={size}
          className="rounded-md border bg-white flex justify-center p-1.5 cursor-pointer h-min w-12"
          style={{
            border: "1px solid #5f83df",
            backgroundColor: selectedSizes.includes(size)
              ? "#5F83DF"
              : "#f8f8f8",
            color: selectedSizes.includes(size) ? "#F8F8F8" : "#343434",
          }}
          onClick={() => handleSizeChange(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default ShoeSizeSelector;
