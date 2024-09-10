import usePost from "@/hooks/use-post";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { SupportTicketAPI } from "@/api/endpoints";
import { MessageReplyIcon } from "@/assets/icons";
import Spinner from "@/components/common/Spinner";

const validationSchema = Yup.object({
  comment: Yup.string().required("Comment is required"),
});

export default function CommentInput({ refetch, ticketId }) {
  const [loading, setLoading] = useState(false);

  const { mutateAsync: commentMuation } = usePost({
    endpoint: `${SupportTicketAPI.TicketComment}${ticketId}/comments`,
    isMultiPart: false,
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await commentMuation(values);
        refetch();
        resetForm();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-between relative"
    >
      <input
        className={cn(
          "w-full py-3 px-4 outline-none border-y rounded-bl-xl",
          formik.touched.comment &&
            formik.errors.comment &&
            "border border-red-500"
        )}
        type="text"
        name="comment"
        placeholder="Type Message Here"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-1.5 px-4 bg-black text-base text-white"
      >
        {loading ? (
          <>
            <Spinner />
            Sending
          </>
        ) : (
          <>
            <MessageReplyIcon />
            Reply
          </>
        )}
      </button>
    </form>
  );
}
