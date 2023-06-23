import clsx from "clsx";

// custom button props type
type Props = {
  text: string;
  type: string;
  disabled?: boolean;
  variant?: string;
  onClick?: () => void;
};
export default function CustomButton({
  variant,
  text,
  onClick,
  type,
  disabled = false,
}: Props) {
  return (
    <input
      onClick={onClick}
      type={type}
      value={text}
      disabled={disabled}
      className={clsx(
        "my-4 py-2 px-2.5 w-full  rounded-md text-white md:text-lg cursor-pointer",
        variant === "danger"
          ? "bg-red-500 hover:bg-red-600"
          : "bg-purple-600 hover:bg-purple-700"
      )}
    ></input>
  );
}
