"use client";

import useConversation from "@/common/hooks/useConversation";
import EmptyState from "@/components/EmptyState/EmptyState";
import clsx from "clsx";

export default function Home() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
