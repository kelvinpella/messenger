import { CldUploadButton } from "next-cloudinary";
import CustomButton from "../Button/CustomButton";
import { FieldProps } from "formik";

export default function CustomImageField({ field, form }: FieldProps) {
  const { name } = field;
  const { setFieldValue } = form;
  const handleUpload = (result: any) => {
    setFieldValue(name, result?.info?.secure_url);
  };
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      uploadPreset="e1ot5r9e"
      onUpload={handleUpload}
    >
      <CustomButton text="Change" type="button" variant="neutral" />
    </CldUploadButton>
  );
}
