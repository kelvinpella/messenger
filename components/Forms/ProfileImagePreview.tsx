import { FormikValues, useFormikContext } from "formik";
import Image from "next/image";
import React from "react";

export default function ProfileImagePreview() {
  const { values } = useFormikContext<FormikValues>();
  return (
    <Image
      src={values.image}
      alt="Profile Picture"
      width={100}
      height={100}
      className="rounded-full"
    ></Image>
  );
}
