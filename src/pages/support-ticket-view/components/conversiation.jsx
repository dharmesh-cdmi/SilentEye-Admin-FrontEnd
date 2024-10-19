import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function Conversiation({ comments }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-scroll px-4 py-6 flex flex-col gap-y-3 gap-x-10"
    >
      {comments.map(({ text, createdBy, _id }) => (
        <Message key={_id} message={text} isOwner={createdBy === "admin"} />
      ))}
    </div>
  );
}

function Message({ message, isOwner }) {
  return (
    <div
      className={cn(
        "self-end w-fit max-w-[90%] md:max-w-[50%] py-1.5 px-3 bg-gray-200 rounded-xl",
        isOwner ? "self-end bg-blue-500 text-white" : "self-start"
      )}
    >
      <p className="relative">{message}</p>
    </div>
  );
}
