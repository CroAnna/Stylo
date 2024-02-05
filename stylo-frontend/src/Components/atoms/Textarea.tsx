import { FC } from "react";
import { TextareaProps } from "../../common/types";

const Textarea: FC<TextareaProps> = ({
  label = "",
  value,
  name,
  placeholder,
  error,
  disabled = false,
  rows,
  cols,
  onChange,
}) => {
  let inputClasses = `border-2 border-solid border-black px-4 bg-white-light w-full rounded-md py-3 font-semibold focus:outline-none text-grey-dark `;

  if (disabled) {
    inputClasses += `cursor-not-allowed bg-slate-200 text-disabled-text hover:bg-slate-200 border-slate-200 `;
  }

  return (
    <div>
      <label htmlFor={label} className="font-semibold text-lg text-grey-dark">
        {label}
      </label>
      <div className="flex h-full   ">
        <textarea
          className={`${inputClasses} h-full`}
          rows={rows}
          cols={cols}
          id={name}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {error && (
        <p className=" text-red-500 font-medium text-center md:text-left rounded-md px-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
