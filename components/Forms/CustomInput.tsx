import { useField } from "formik";
// CustomInput prop types
type Props = {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
};
export default function CustomInput({ label, ...props }: Props) {
  const [field, meta] = useField(props);

  return (
    <div className="w-full flex flex-col capitalize">
      <label htmlFor={props.id} className="font-bold ">
        {label}:
      </label>
      <input
        {...field}
        {...props}
        className=" py-2 px-2.5 text-sm my-2 border  outline-none border-slate-500 rounded-md"
      ></input>
    </div>
  );
}
