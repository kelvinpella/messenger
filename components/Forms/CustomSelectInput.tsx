"use client";
import { FieldProps } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";
import Select, { MultiValue } from "react-select";

type OptionType = { label: string; value: string };
type CustomSelectInputProps = FieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    selectOptions: OptionType[];
    label: string;
  };
export default function CustomSelectInput({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}: CustomSelectInputProps) {
  const { label, id, selectOptions, placeholder } = props;
  // field error ** buggy **
  const fieldError = !!touched[field.name] && !!errors[field.name];
  const handleChange = (newValue: MultiValue<OptionType>) => {
    setFieldValue(field.name, newValue);
  };
  return (
    <div className="w-full flex flex-col  py-1 ">
      {label && (
        <label htmlFor={id} className="font-bold capitalize md:text-lg">
          {label}:
        </label>
      )}
      <Select
        options={selectOptions}
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-sm md:text-base py-1 px-2 md:py-1 md:px-2  my-2 md:mt-3  border outline-none border-slate-500 rounded-md"
        styles={{
          control: (styles) => ({ ...styles, border: 0, boxShadow: "none" }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        isMulti
        noOptionsMessage={() => "No Options"}
      />
      {fieldError && (
        <div className="text-xs md:text-sm text-red-500">
          {errors[field.name] as string}
        </div>
      )}
    </div>
  );
}
