"use client";

import useConversation from "@/common/hooks/useConversation";
import { MessageFormSchema } from "@/zod/validationSchema";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CustomInput from "../Forms/CustomInput";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
// message form value type
type MessageValueType = z.infer<typeof MessageFormSchema>;
const initialValues: MessageValueType = {
  message: "",
};
const validationSchema = toFormikValidationSchema(MessageFormSchema);

export default function MessageForm() {
  const { conversationId } = useConversation();
  const onSubmit = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<MessageValueType>
  ) => {
    await axios.post("/api/messages", {
      ...values,
      conversationId,
    });
    resetForm();
  };
  const handleImageUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleImageUpload}
        uploadPreset="e1ot5r9e"
      >
        <HiPhoto size={30} className=" text-sky-500" />
      </CldUploadButton>{" "}
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="flex items-center gap-2 w-full lg:gap-4">
          <CustomInput
            id="message"
            type="text"
            name="message"
            placeholder="Write a message"
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            parentClassName="relative w-full"
            showInputError={false}
          />
          <button
            className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
            type="submit"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </Form>
      </Formik>
    </div>
  );
}
