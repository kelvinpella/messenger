"use client";
import { IoClose, IoTrash } from "react-icons/io5";
import useOtherUser from "@/common/hooks/useOtherUser";
import { Transition, Dialog } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { useMemo, Fragment } from "react";
import Avatar from "../Avatar/Avatar";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

export default function ProfileDrawer({
  isOpen,
  onClose,
  data,
}: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);
  const title = useMemo(
    () => data.name || otherUser.name,
    [data.name, otherUser.name]
  );
  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.users.length} members`;
    return "Active";
  }, [data]);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-50 relative " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none pl-10 fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className=" pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-sky-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <Avatar user={otherUser} />
                        </div>
                        <div>{title}</div>
                        <div className="text-sm text-gray-500">
                          {statusText}
                        </div>
                        <div className="flex gap-10 my-8">
                          <div
                            className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                            onClick={() => {}}
                          >
                            <div className=" w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                              <IoTrash size={20} />
                            </div>
                            <div className="text-sm font-light text-neutral-600">
                              Delete
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
