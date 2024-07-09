import { cn } from "@/lib/utils";

export default function Conversiation({ chats }) {
  return (
    <div className="max-h-[28rem] overflow-y-scroll px-4 py-10 flex flex-col gap-y-3 gap-x-10">
      {chats.map((chat) => (
        <Message
          key={chat.timestamp}
          message={chat.message}
          isOwner={chat.isOwner}
        />
      ))}
    </div>
  );
}

function Message({ message, isOwner }) {
  return (
    <div
      className={cn(
        "self-end w-fit max-w-[50%] py-1.5 px-3 bg-gray-200 rounded-xl",
        isOwner ? "self-end bg-blue-500 text-white" : "self-start"
      )}
    >
      <p className="relative">{message}</p>
    </div>
  );
}
