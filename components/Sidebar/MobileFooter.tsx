"use client";
import useConversation from "@/common/hooks/useConversation";
import useRoutes from "@/common/hooks/useRoutes";
import MobileItem from "./MobileItem";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) return null;
  return (
    <div className="fixed justify-between w-full lg:hidden bottom-0 z-40 flex items-center bg-white border-t-[1px]">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
