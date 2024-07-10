import {
  CreatedIcon,
  PersonQuestionMarkIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import Header from "@/components/common/header";
import { Ban, XCircleIcon } from "lucide-react";
import Conversiation from "./components/conversiation";
import { chats } from "./data";

export default function SupportTicketView() {
  return (
    <div>
      <Header title="Support Ticket View">
        <div className="flex divide-x-[1.5px] border rounded-md overflow-hidden">
          <button className="inline-flex items-center gap-2 py-1.5 px-2">
            <PointerIcon />
            Account & Setting
          </button>

          <button className="inline-flex items-center gap-2 py-1.5 px-2">
            <CreatedIcon />
            Dec 4, 2024 12:32
          </button>
          <button className="inline-flex items-center gap-2 py-1.5 px-2 bg-green-500 text-white">
            <PersonQuestionMarkIcon />
            Active
          </button>
        </div>
      </Header>

      <div className="w-full flex flex-col divide-y-[1.5px] border rounded-xl overflow-hidden">
        <div className="flex justify-between gap-4">
          <div className="inline-flex items-center text-xl px-5">
            hello@gmail.com
          </div>
          <div className="flex divide-x-[1.5px] border-l">
            <button className="inline-flex items-center gap-2 text-xl py-3 px-5 hover:bg-black hover:text-white duration-300">
              <XCircleIcon />
              Close
            </button>
            <button className="inline-flex items-center gap-2 text-xl py-3 px-5 hover:bg-black hover:text-white duration-300">
              <Ban />
              Ban User
            </button>
            <button className="inline-flex items-center gap-2 text-xl py-3 px-5 hover:bg-black hover:text-white duration-300">
              <TrashIcon className="text-rose-500" />
              Delete
            </button>
          </div>
        </div>
        <div className="">
          <Conversiation chats={chats} />

          <div className="flex justify-between border-t">
            <input
              className="w-full py-3 px-4"
              type="text"
              placeholder="Type Message Here"
            />

            <button className="px-4 bg-black text-white">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
