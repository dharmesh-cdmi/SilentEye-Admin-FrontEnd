/* eslint-disable react-hooks/rules-of-hooks */
import { ContactFormAPI } from "@/api/endpoints";
import {
  ActionIcon,
  CallIcon,
  CreatedIcon,
  EmailIcon,
  IdendityIcon,
  MessageIcon,
  SubjectIcon,
  TrashIcon,
} from "@/assets/icons";
import DeleteModal from "@/components/common/modals/delet-modal";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";

export default function ContactColums(contactRefetch) {
  return [
    {
      accessorKey: "_id",
      header: () => (
        <div className="text-nowrap text-base text-black font-medium opacity-60">
          Index
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-black font-medium text-center opacity-60 ">
          #{Number(row.id) + 1}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "subject",
      header: () => (
        <div className="inline-flex items-center items-left gap-2 text-base text-black font-medium">
          <SubjectIcon />
          Subject
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="w-[16rem] text-left truncate text-base text-black font-medium">
            {row?.getValue("subject")}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <MessageIcon />
          Message
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
            {row?.getValue("message")}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <IdendityIcon />
          Name
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
            {row?.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <EmailIcon />
          Email
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
            {row?.getValue("email")}
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <CallIcon />
          Contact
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
            {row?.getValue("contact")}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="inline-flex items-center gap-2 text-base text-black font-medium">
          <CreatedIcon />
          Created
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="h-6 max-w-40 sm:max-w-72 md:max-w-[31rem] truncate text-base text-black font-medium">
            {formatDateTime(row.original.createdAt)}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="inline-flex items-center justify-end gap-2 text-base text-black font-medium">
          <ActionIcon />
          Action
        </div>
      ),
      cell: ({ row }) => {
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        return (
          <>
            <div className="flex justify-center">
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200"
              >
                <TrashIcon />
              </Button>
            </div>
            <DeleteModal
              open={isDeleteModalOpen}
              setOpen={setIsDeleteModalOpen}
              dataRefetch={contactRefetch}
              endpoint={ContactFormAPI.Delete}
              id={row.original._id}
            />
          </>
        );
      },
    },
  ];
}
