"use client";

import Image from "next/image";
import Modal from "../Modal/Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}
export default function ImageModal({ isOpen, onClose, src }: ImageModalProps) {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        {" "}
        <Image src={src} alt="Image" className="object-cover" fill />
      </div>
    </Modal>
  );
}
