import { Package } from "lucide-react";

export default function AddPaymentGatewayForm() {
  return (
    <div className="p-10 flex flex-col border rounded-lg">
      <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Order
          </div>
          <div className="w-full flex divide-x-[1.5px]">
            <div className="h-12 w-full inline-flex items-center gap-2.5 px-4 text-nowrap">
              <input
                type="radio"
                name="order"
                id="test"
                className="w-5 h-5 cursor-pointer"
                checked={true}
              />
              <label className="cursor-pointer" htmlFor="test">
                Test Mode
              </label>
            </div>

            <div className="h-12 w-full inline-flex items-center gap-2.5 px-4 text-nowrap">
              <input
                type="radio"
                name="order"
                id="live"
                className="h-5 w-5 cursor-pointer"
              />
              <label className="cursor-pointer" htmlFor="live">
                Live Mode
              </label>
            </div>
          </div>
        </div>

        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Name
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              value="Paypal"
              placeholder="Paypal"
            />
          </div>
        </div>

        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Icon
          </div>
          <div className="w-20 max-w-20 flex items-center justify-center">
            <Package />
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Your Duration in Hours Here"
            />
          </div>
        </div>

        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">Key</div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Enter Key"
            />
          </div>
        </div>

        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Salt
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Enter Salt Key"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
