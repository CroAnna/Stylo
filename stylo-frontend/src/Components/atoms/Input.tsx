import { FC, useState } from "react";
import { EyeSlash } from "@phosphor-icons/react";
import { InputProps } from "../../common/types";

const Input: FC<InputProps> = ({
  type = "text",
  label = "",
  value,
  name,
  placeholder,
  error,
  disabled = false,
  onChange,
}) => {
  let inputClasses = `border-2 border-solid border-black px-4 bg-white-light w-full rounded-md py-3 font-semibold focus:outline-none text-grey-dark `;

  const [inputType, setInputType] = useState(type);

  const changeVisibility = () => {
    setInputType(inputType == "text" ? "password" : "text");
  };

  if (disabled) {
    inputClasses += `cursor-not-allowed bg-slate-200 text-disabled-text hover:bg-slate-200 border-slate-200 `;
  }

  return (
    <div>
      <label htmlFor={label} className="font-semibold text-lg text-grey-dark">
        {label}
      </label>
      <div className="flex relative justify-center align-middle ">
        <input
          className={inputClasses}
          type={inputType}
          id={name}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
        {type == "password" && (
          <div
            className="absolute right-2 cursor-pointer h-full  flex items-center "
            onClick={() => {
              changeVisibility();
            }}
          >
            <EyeSlash size={32} color="#5d5d5d" />
          </div>
        )}
      </div>

      {error && (
        <p className=" text-red-500 font-medium text-center md:text-left rounded-md px-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
