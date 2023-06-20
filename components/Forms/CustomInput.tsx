import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";
// CustomInput prop types
type Props = InputHTMLAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  ClassAttributes<HTMLInputElement> & {
    label?: string;
    parentClassName?: string;
    showInputError?: boolean;
  };

export default function CustomInput({
  label,
  parentClassName,
  showInputError = true,
  className,
  ...props
}: Props) {
  const [field, meta] = useField(props);
  // field error
  const fieldError = showInputError && meta.touched && meta.error;

  return (
    <div className={parentClassName || "w-full flex flex-col  py-1 "}>
      {label && (
        <label htmlFor={props.id} className="font-bold capitalize md:text-lg">
          {label}:
        </label>
      )}
      <input
        {...field}
        {...props}
        className={
          className ||
          "text-sm md:text-base py-2 px-2.5 md:py-2.5 md:px-3  my-2 md:mt-3  border outline-none border-slate-500 rounded-md"
        }
      ></input>
      {fieldError && (
        <div className="text-xs md:text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
