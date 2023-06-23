import useConversation from "@/common/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import CustomButton from "../Button/CustomButton";
interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}
export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/conversations/${conversationId}`);
      onClose();
      setIsLoading(false);
      router.push("/conversations");
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  }, [router, conversationId, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-center">
        <div className="flex mx-auto h-12 w-12 flex-shrink-0 justify-center items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className=" h-6 w-6 text-red-600" />
        </div>
        <div className="text-center mt-3 sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation?
              <br />
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-x-3">
        <CustomButton
          onClick={onDelete}
          disabled={isLoading}
          type="button"
          text="Delete"
          variant="danger"
        />
        <CustomButton
          onClick={onClose}
          disabled={isLoading}
          type="button"
          text="Cancel"
          variant="secondary"
        />
      </div>
    </Modal>
  );
}
