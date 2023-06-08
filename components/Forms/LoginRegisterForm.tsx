import { inputFields } from "@/common/exportedData";
import { LoginUserSchema, RegisterUserSchema } from "@/zod/validationSchema";
import { Formik, FormikValues, Form } from "formik";
import { useCallback, useMemo } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInput from "./CustomInput";
import CustomButton from "../Button/CustomButton";
import { z } from "zod";

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

export default function LoginRegisterForm({
  isLoginForm,
}: {
  isLoginForm: boolean;
}) {
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
      console.log("isLoginForm", isLoginForm, values);
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
