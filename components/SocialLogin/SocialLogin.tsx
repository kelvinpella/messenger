import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
export default function SocialLogin() {
  const socialLinks = [
    {
      name: "github",
      icon: <AiOutlineGithub className="text-2xl md:text-4xl" />,
    },
    {
      name: "google",
      icon: <AiOutlineGoogle className="text-2xl md:text-4xl" />,
    },
  ];
  const socialLogin = async (action: string) => {
    const result = await signIn(action, { redirect: false });
    // result?.error
    //   ? toast.error(`Login failed! ${result.error}`)
    //   : toast.success(`Logged in successfully!`);
  };
  return (
    <div className="p-2">
      <div className="flex w-full space-x-2 items-center justify-between ">
        <hr className="w-full" />
        <p className="text-slate-500 text-sm md:text-base whitespace-nowrap">
          Or continue with
        </p>
        <hr className="w-full" />
      </div>
      <div className="w-full flex items-center justify-center space-x-2 md:space-x-4 mt-4 md:mt-6">
        {socialLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => socialLogin(link.name)}
            className="border border-slate-500 py-1 px-10 md:py-1.5 md:px-14 rounded-md"
          >
            {link.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
