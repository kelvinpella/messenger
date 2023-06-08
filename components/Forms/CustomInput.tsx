import { useTransition } from "@react-spring/web";
import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";
// CustomInput prop types
type Props = InputHTMLAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  ClassAttributes<HTMLInputElement> & { label: string };

export default function CustomInput({ label, ...props }: Props) {
  const [field, meta] = useField(props);
  // field error
  const fieldError = meta.touched && meta.error;
  // fade in and out errors as they enter and leave
  const errorAnimations = useTransition(fieldError, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <div className="w-full flex flex-col  py-1 ">
      <label htmlFor={props.id} className="font-bold capitalize md:text-lg">
        {label}:
      </label>
      <input
        {...field}
        {...props}
        className="text-sm md:text-base py-2 px-2.5 md:py-2.5 md:px-3  my-2 md:mt-3  border outline-none border-slate-500 rounded-md"
      ></input>
      {fieldError && (
        <div className="text-xs md:text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
