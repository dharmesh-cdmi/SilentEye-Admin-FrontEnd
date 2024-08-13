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
import { useNavigate, useParams } from "react-router-dom";
import useGet from "@/hooks/use-get";
import useUpdate from "@/hooks/use-update";
import useDelete from "@/hooks/use-delete";
import { cn, formatDateTime } from "@/lib/utils";

const statusColor = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Answered: "bg-blue-600",
  Closed: "bg-gray-500",
};

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

  const navigate = useNavigate();

  if (!isLoading && !ticketData) {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  const { mutateAsync: closeTicket, isLoading: closingTicket } = useUpdate({
    endpoint: SupportTicketAPI.CloseTicket + ticketId,
    isMultiPart: false,
  });

  const { mutateAsync: banUser, isLoading: banningUser } = useUpdate({
    endpoint: SupportTicketAPI.BanUser + ticketData?.user?._id,
    isMultiPart: false,
  });

  const { mutateAsync: deleteTicket, isLoading: isDeleting } = useDelete({
    endpoint: SupportTicketAPI.DeleteTicket,
  });

  const handleClose = async () => {
    await closeTicket({
      status: "Closed",
    });
    ticketRefetch();
  };

  const handleBanUser = async () => {
    await banUser({ blocked: true });
    ticketRefetch();
  };

  const deleteConversiation = async () => {
    await deleteTicket(ticketId);
    ticketRefetch();
  };

  return (
    <div>
      <Header title="Support Ticket View">
        <div className="flex justify-between xl:justify-end divide-x-[1.5px] border rounded-md overflow-hidden">
          <p className="inline-flex items-center gap-2 py-1.5 px-2">
            <PointerIcon />
            {ticketData?.type}
          </p>

          <p className="inline-flex items-center gap-2 py-1.5 px-2">
            <CreatedIcon />
            {formatDateTime(ticketData?.createdAt)}
          </p>

          <p
            className={cn(
              "inline-flex items-center gap-2 py-1.5 px-2 text-white",
              statusColor[ticketData?.status]
            )}
          >
            <PersonQuestionMarkIcon />
            {ticketData?.status}
          </p>
        </div>
      </Header>

      <div className="w-full flex flex-col divide-y-[1.5px] border rounded-xl overflow-hidden">
        <div className="flex justify-between gap-4">
          <div className="w-1/2 inline-flex items-center text-xl px-5">
            {ticketData?.user?.email}
          </div>

          <div className="w-1/2 overflow-x-scroll flex xl:justify-end divide-x-[1.5px]">
            <button
              onClick={handleClose}
              className="min-w-fit inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 border-l hover:bg-black hover:text-white duration-300"
            >
              {closingTicket ? (
                "Closing.."
              ) : (
                <>
                  <XCircleIcon />
                  Close
                </>
              )}
            </button>
            <button
              onClick={handleBanUser}
              className="inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 hover:bg-black hover:text-white duration-300"
            >
              <Ban />
              {banningUser ? "Loading..." : "Ban User"}
            </button>
            <button
              onClick={deleteConversiation}
              className="inline-flex items-center gap-2 text-xl text-nowrap py-3 px-5 hover:bg-black hover:text-white duration-300"
            >
              <TrashIcon className="text-rose-500" />
              {isDeleting ? "Deleting.." : "Delete"}
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
