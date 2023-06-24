"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { Field, Form, Formik, FormikValues } from "formik";
import CustomInput from "../Forms/CustomInput";
import { z } from "zod";
import { GroupChatSchema } from "@/zod/validationSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomSelectInput from "../Forms/CustomSelectInput";
import CustomButton from "../Button/CustomButton";
import axios from "axios";
import { toast } from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

// infer type from GroupChatSchema
type InitialValuesType = z.infer<typeof GroupChatSchema>;

const initialValues: InitialValuesType = {
  name: "",
  members: [],
};
const validationSchema = toFormikValidationSchema(GroupChatSchema);

export default function GroupChatModal({
  isOpen,
  onClose,
  users,
}: GroupChatModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const selectOptions = users.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
  const onSubmit = (values: FormikValues) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...values,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 ">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Create a group chat
              </h2>
              <p className="mt-1 text-base leading-6 text-gray-600">
                Create a chat with more than 2 people
              </p>
              <div className="mt-6 flex flex-col gap-y-4">
                <CustomInput
                  name="name"
                  label="Group Name"
                  id="name"
                  placeholder="Enter group name"
                />
                <Field
                  name="members"
                  component={CustomSelectInput}
                  selectOptions={selectOptions}
                  label="Members"
                  id="members"
                  placeholder="Select members"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between my-3 space-x-4">
            <CustomButton
              type="button"
              text="cancel"
              variant="neutral"
              disabled={isLoading}
              onClick={onClose}
            />
            <CustomButton type="submit" text="create" disabled={isLoading} />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}
