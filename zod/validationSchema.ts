import { z } from "zod";
import { User } from "@prisma/client";

// general user input validation  schema
export const UserInputValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
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
  confirmPassword: z.string(),
});

// user login schema
// picks only email and password property from UserInputValidationSchema
export const LoginUserSchema = UserInputValidationSchema.pick({
  email: true,
  password: true,
});

// user registration schema
// copy of UserInputValidationSchema
export const RegisterUserSchema = UserInputValidationSchema.refine(
  // check if passwords match then return error message
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// message form
export const MessageFormSchema = z.object({
  message: z.string(),
});

// settings schema

export const SettingsSchema = z.object({
  name: z.string({ required_error: "Name is required!" }),
  image: z.any(),
});

// group chat schema
export const GroupChatSchema = z.object({
  name: z.string({ required_error: "Group name is required!" }),
  members: z.record(z.string(), z.string()).array().min(2, {
    message: "Group must contain at least 3 members, including you!",
  }),
});
