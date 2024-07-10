export default function EditRefundForm() {
  return (
    <div className="p-10 flex flex-col border rounded-lg">
      <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Status
          </div>
          <div className="w-full">
            <select className="h-12 w-full px-5 outline-none bg-orange-400 text-white">
              <option selected>Pending</option>
              <option>Approved</option>
              <option>Reject</option>
              <option>Refunded</option>
              <option>True Refunded</option>
            </select>
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Message
          </div>
          <div className="w-full">
            <textarea
              rows={3}
              className="w-full px-5 py-2 outline-none"
              value={12}
              placeholder="Write your message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
