export default function RefundSettingForm() {
  return (
    <div className="p-10 flex flex-col border rounded-lg">
      <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Under Processing
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              value=""
              placeholder="Your Duration in Hours Here"
            />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Initiated
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              value={12}
              placeholder="12"
            />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Refunded
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Your Duration in Hours Here"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
