import {
  CreatedIcon,
  PersonQuestionMarkIcon,
  PointerIcon,
  TrashIcon,
} from "@/assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import Conversiation from "./components/conversiation";
import CommentInput from "./components/comment-input";
import { SupportTicketAPI } from "@/api/endpoints";
import { cn, formatDateTime } from "@/lib/utils";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { Ban, XCircleIcon } from "lucide-react";
import useUpdate from "@/hooks/use-update";
import useDelete from "@/hooks/use-delete";
import useGet from "@/hooks/use-get";
import toast from "react-hot-toast";
import { useEffect } from "react";

const statusColor = {
  Active: "bg-green-500",
  Pending: "bg-orange-400",
  Answered: "bg-blue-600",
  Closed: "bg-gray-500",
};

export default function SupportTicketView() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isFetched,
    data: { data: { data: ticketData } = {} } = {},
    refetch: ticketRefetch,
  } = useGet({
    key: "ticketData",
    endpoint: SupportTicketAPI.TicketDetails + ticketId,
  });

  useEffect(() => {
    if (isFetched && !ticketData) {
      toast.error("Support ticket not found");
      navigate("/support-ticket");
    }
  }, [isFetched, navigate, ticketData]);

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
    try {
      const res = await closeTicket({
        status: "Closed",
      });
      ticketRefetch();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to update ticket status"
      );
    }
  };

  const handleBanUser = async () => {
    try {
      const res = await banUser({ blocked: true });
      ticketRefetch();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to ban the user");
    }
  };

  const deleteConversiation = async () => {
    try {
      const res = await deleteTicket(ticketId);
      ticketRefetch();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to delete support ticket"
      );
    }
  };

  if (!isFetched) return <Loader />;

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

        <div className=" ">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="h-[65vh] flex flex-col justify-between">
              <Conversiation comments={ticketData?.comments || []} />
              <CommentInput refetch={ticketRefetch} ticketId={ticketId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
