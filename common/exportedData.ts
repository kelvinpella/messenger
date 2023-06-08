import { Input } from "@/typings";

// array of input fields
export const inputFields: Input[] = [
  {
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
    autoComplete: "current-password",
  },
  {
    id: "confirm-password",
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    autoComplete: "current-password",
  },
];
