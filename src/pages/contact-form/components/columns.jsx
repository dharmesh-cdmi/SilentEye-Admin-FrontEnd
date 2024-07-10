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
import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-nowrap text-base text-black font-medium opacity-60">
        Index
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-black font-medium text-center opacity-60 ">
        #{row.getValue("id")}
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
          {row.getValue("subject")}
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
          {row.getValue("message")}
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
          {row.getValue("name")}
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
          {row.getValue("email")}
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
          {row.getValue("contact")}
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
        <div className="max-w-40 sm:max-w-72 md:max-w-[31rem] truncate text-base text-black font-medium">
          {row.getValue("createdAt")}
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
    cell: () => (
      <div className="flex justify-center">
        <Button className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
