import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  placeholder?: string;
  register: Function;
  name: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const InputForm = (props: InputProps) => {
  const { id, label, icon, placeholder, name, register, error } = props;

  return (
    <>
      <label
        htmlFor={id}
        className={`block mb-2 font-bold text-sm ${
          error ? "text-red-600" : "text-white"
        }`}
      >
        {label}
      </label>
      <div className="relative mb-6">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-50">
            {icon}
          </div>
        )}
        <input
          type="text"
          id={id}
          className={`border border-primary bg-transparent text-[#DEDEDE] rounded-lg focus:ring-primary focus:ring-2 focus:border-primary block w-full ${
            icon ? "pl-10" : "pl-4"
          } admin-box p-3 transition`}
          placeholder={placeholder}
          {...register(name)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
        {error && (
          <p className="text-red-600 error-text">{error.message?.toString()}</p>
        )}
      </div>
    </>
  );
};

export default InputForm;
