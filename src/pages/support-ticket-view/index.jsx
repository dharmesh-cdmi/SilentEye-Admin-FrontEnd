import {
  CreatedIcon,
  PersonQuestionMarkIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import Conversiation from "./components/conversiation";
import CommentInput from "./components/comment-input";
import { SupportTicketAPI } from "@/api/endpoints";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { Ban, XCircleIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import useGet from "@/hooks/use-get";

export default function SupportTicketView() {
  const { ticketId } = useParams();

  const {
    isLoading,
    data: { data: { data: ticketData } = {} } = {},
    refetch: ticketRefetch,
  } = useGet({
    key: "ticketData",
    endpoint: SupportTicketAPI.TicketDetails + ticketId,
  });

  const handleClose = async () => {
    console.log("close");
  };

  const handleBanUser = async () => {
    console.log("handleBanUser");
  };

  const deleteConversiation = async () => {
    console.log("deleteConversiation");
  };

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
          <div className="w-1/2 inline-flex items-center text-xl px-5">
            {ticketData?.user?.email}
          </div>

          <div className="w-1/2 overflow-x-scroll flex divide-x-[1.5px] border-l">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 hover:bg-black hover:text-white duration-300"
            >
              <XCircleIcon />
              Close
            </button>
            <button
              onClick={handleBanUser}
              className="inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 hover:bg-black hover:text-white duration-300"
            >
              <Ban />
              Ban User
            </button>
            <button
              onClick={deleteConversiation}
              className="inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 hover:bg-black hover:text-white duration-300"
            >
              <TrashIcon className="text-rose-500" />
              Delete
            </button>
          </div>
        </div>
        <div className="">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Conversiation comments={ticketData?.comments || []} />
              <CommentInput refetch={ticketRefetch} ticketId={ticketId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
