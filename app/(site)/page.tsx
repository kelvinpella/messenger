import Image from "next/image";
import logo from "@/public/images/logo.png";
import AuthForm from "@/components/Forms/AuthForm";
export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center py-12 px-6 lg:px-8 bg-gray-100">
      <div className="relative w-12 h-12 md:w-14 md:h-14 mx-auto my-2 md:my-4">
        <Image fill className="object-contain" src={logo} alt="logo"></Image>
      </div>
      <AuthForm />
    </div>
  );
}
