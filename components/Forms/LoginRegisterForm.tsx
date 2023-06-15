"use client";
import { inputFields } from "@/common/exportedData";
import { signIn } from "next-auth/react";
import {
  LoginUserSchema,
  RegisterUserSchema,
  UserInputValidationSchema,
} from "@/zod/validationSchema";
import { Formik, FormikValues, Form } from "formik";
import { useCallback, useMemo } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInput from "./CustomInput";
import CustomButton from "../Button/CustomButton";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// user input value types inferred from UserInputValidationSchema
type UserInputTypes = z.infer<typeof UserInputValidationSchema>;

// initial values
const initialValues: UserInputTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function LoginRegisterForm({
  isLoginForm,
}: {
  isLoginForm: boolean;
}) {
  const router = useRouter();
  // Validation schema using zod-formik-adapater
  // schema  depends on current form
  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        isLoginForm ? LoginUserSchema : RegisterUserSchema
      ),
    [isLoginForm]
  );

  // create onSubmit handler
  const onSubmit = useCallback(
    async (values: FormikValues) => {
      const { name, email, password } = values;
      // Register user
      if (isLoginForm) {
        // login user
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          toast.error(`Login failed! ${result.error}`);
        } else {
          router.push("/users");
          toast.success(`Logged in successfully!`);
        }
      } else {
        //register user
        try {
          await axios.post("/api/register", {
            name,
            email,
            password,
          });
          // sign in after successful registration
          await signIn("credentials", { email, password });
          toast.success(`Account for ${name} created successfully!`);
        } catch (error: any) {
          // console.log(error);
          toast.error(error.response.data);
        }
      }
    },
    [isLoginForm]
  );

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          {inputFields.map((field) => {
            const {
              type,
              id,
              name,
              placeholder,
              label,
              autoComplete = "off",
            } = field;
            // hide name and confirmPassword field in login form
            const show =
              name === "name" || name === "confirmPassword"
                ? !isLoginForm
                : true;
            return (
              show && (
                <CustomInput
                  key={id}
                  id={id}
                  type={type}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                />
              )
            );
          })}
          <CustomButton
            text={isLoginForm ? "Sign in" : "Sign up"}
            type="submit"
          />
        </Form>
      </Formik>
    </div>
  );
}
