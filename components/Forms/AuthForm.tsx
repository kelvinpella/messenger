"use client";
import { LoginUserSchema, RegisterUserSchema } from "@/zod/validationSchema";
import { Formik, Form, FormikValues } from "formik";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMemo, useCallback } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "../Button/CustomButton";
// login values types
// infered from LoginUserSchema
type loginValuesType = z.infer<typeof LoginUserSchema>;

// login form initial values
const loginInitialValues: loginValuesType = {
  email: "",
  password: "",
};

// register values types
// infered from RegisterUserSchema
type registerValuesType = z.infer<typeof RegisterUserSchema>;

// Registration form initial values
// spreads login initialValues
const registerInitialValues: registerValuesType = {
  ...loginInitialValues,
  name: "",
  confirmPassword: "",
};

// type of current form
type formType = "login" | "register";

export default function AuthForm() {
  // keep track of which form is currently displayed
  const [currentForm, setcurrentForm] = useState<formType>("login");
  // check if current form is login form
  const isLoginForm = currentForm === "login";

  // show initial value  based on current form
  // useMemo to prevent unnecessary recreation of the initial values
  const initialValues = useMemo(
    () => (isLoginForm ? loginInitialValues : registerInitialValues),
    [isLoginForm]
  );

  // Validation schema using zod-formik-adapater
  // schema  depends on current from
  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        isLoginForm ? LoginUserSchema : RegisterUserSchema
      ),
    [isLoginForm]
  );

  // create onSubmit handler
  const onSubmit = useCallback(
    (values: FormikValues) => {
      console.log(currentForm, values);
    },
    [currentForm]
  );

  // array of input fields
  const inputFields = useMemo(
    () => [
      {
        show: !isLoginForm, // additional prop to hide field in login form
        id: "name",
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
      },
      {
        id: "email",
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
      },
      {
        id: "password",
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
      },
      {
        show: !isLoginForm, // additional prop to hide field in login form
        id: "confirm-password",
        type: "password",
        name: "password",
        label: "Confirm Password",
        placeholder: "Confirm Password",
      },
    ],
    [isLoginForm]
  );
  return (
    <div className="p-2  w-full">
      <h2 className=" text-gray-900 font-bold text-xl md:text-3xl text-center">
        Sign in to your account
      </h2>
      <div className="w-full bg-white py-4 px-3 my-4 rounded-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            {inputFields.map(
              ({ type, id, name, placeholder, label, show = true }) =>
                show && (
                  <CustomInput
                    key={id}
                    id={id}
                    type={type}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                  />
                )
            )}
            <CustomButton
              text={isLoginForm ? "Sign in" : "Sign up"}
              type="submit"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
