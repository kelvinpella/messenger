import { z } from "zod";

// user login schema
export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
});

// user registration schema that intersects with login schema
// provides additional properties such as name and confirm password
// checks if passwords match through refine function and displays the error in confirmPassword field
export const RegisterUserSchema = LoginUserSchema.merge(
  // add name and confirmPassword
  z.object({
    name: z.string({ required_error: "Name is required" }),
    confirmPassword: z.string(),
  })
).refine(
  // check if passwords match then return error message
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);
