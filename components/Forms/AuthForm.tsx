"use client";
import { useMemo, useState } from "react";
import LoginRegisterForm from "./LoginRegisterForm";
import SocialLogin from "../SocialLogin/SocialLogin";

// type of current form
type formType = "login" | "register";

export default function AuthForm() {
  // keep track of which form is currently displayed
  const [currentForm, setcurrentForm] = useState<formType>("login");
  // check if current form is login form
  const isLoginForm = currentForm === "login";

  // show desired form
  const toggleForm = () => {
    setcurrentForm(isLoginForm ? "register" : "login");
  };
  // links to toggle desired form
  const availableForms = useMemo(
    () => [
      {
        name: "Sign in",
        prompt: "Already have an account?",
        show: !isLoginForm,
      },
      {
        name: "Sign up",
        prompt: "Don't have an account?",
        show: isLoginForm,
      },
    ],
    [isLoginForm]
  );

  return (
    <div className="p-2  w-full">
      <h2 className=" text-gray-900 font-bold text-xl md:text-3xl text-center">
        {isLoginForm ? "Sign in to your account" : "Create Messenger account"}
      </h2>
      <div className="w-full my-4 md:my-6 md:max-w-xl lg:max-w-lg md:mx-auto bg-white py-4 px-3 md:px-5  rounded-md">
        <LoginRegisterForm isLoginForm={isLoginForm} />
        <SocialLogin />
        <div className="my-2 md:my-4">
          {availableForms.map(
            ({ name, show, prompt }) =>
              show && (
                <p key={name} className="text-center">
                  {prompt}
                  <button
                    onClick={toggleForm}
                    className="text-purple-500 hover:text-purple-600 hover:underline mx-1"
                  >
                    {name}
                  </button>
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
}
