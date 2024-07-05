import {
  ActionIcon,
  CallIcon,
  CreatedIcon,
  EmailIcon,
  IdendityIcon,
  MessageIcon,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M2.08334 9.99967C2.08334 6.26772 2.08334 4.40175 3.24271 3.24237C4.40209 2.08301 6.26806 2.08301 10 2.08301C13.7319 2.08301 15.5979 2.08301 16.7573 3.24237C17.9167 4.40175 17.9167 6.26772 17.9167 9.99967C17.9167 13.7316 17.9167 15.5976 16.7573 16.757C15.5979 17.9163 13.7319 17.9163 10 17.9163C6.26806 17.9163 4.40209 17.9163 3.24271 16.757C2.08334 15.5976 2.08334 13.7316 2.08334 9.99967Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M15 15H8.33334"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 11.667H12.5M10 11.667H8.33334"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
        <div className="max-w-40 truncate sm:max-w-72 md:max-w-[31rem] text-base text-black font-medium">
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
