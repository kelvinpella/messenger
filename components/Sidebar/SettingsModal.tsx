"use client";
import { User } from "@prisma/client";
import Modal from "../Modal/Modal";
import { Field, Form, Formik, FormikValues } from "formik";
import getCurrentUser from "@/actions/getCurrentUser";
import { useMemo, useState } from "react";
import { SettingsSchema } from "@/zod/validationSchema";
import { z } from "zod";
import placeholderProfileImage from "@/public/images/placeholder.png";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInput from "../Forms/CustomInput";
import ProfileImagePreview from "../Forms/ProfileImagePreview";
import CustomImageField from "../Forms/CustomImageField";
import CustomButton from "../Button/CustomButton";
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}
// infer schema to form types
type InitialValueType = z.infer<typeof SettingsSchema>;

const validationSchema = toFormikValidationSchema(SettingsSchema);
const onSubmit = (values: FormikValues) => {
  console.log(values); // TODO api
};
export default function SettingsModal({
  isOpen,
  onClose,
  currentUser,
}: SettingsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: InitialValueType = useMemo(
    () => ({
      name: currentUser?.name ?? "",
      image: currentUser?.image ?? placeholderProfileImage,
    }),
    [currentUser]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Edit your public information
          </p>
          <CustomInput name="name" label="name" placeholder="Enter name" />
          <div className="w-full flex items-end my-2 space-x-4">
            <ProfileImagePreview />
            <Field name="image" component={CustomImageField} />
          </div>
          <div className="w-full flex items-center justify-between my-3 space-x-4">
            <CustomButton
              type="button"
              text="cancel"
              variant="neutral"
              disabled={isLoading}
              onClick={onClose}
            />
            <CustomButton type="submit" text="save" disabled={isLoading} />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}
