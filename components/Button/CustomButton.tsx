// custom button props type
type Props = {
  text: string;
  type: string;
};
export default function CustomButton({ text, type }: Props) {
  return (
    <input
      type={type}
      value={text}
      className="my-4 py-2 px-2.5 w-full bg-purple-600 hover:bg-purple-500 rounded-md text-white"
    ></input>
  );
}
