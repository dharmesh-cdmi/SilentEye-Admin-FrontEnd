import { ValidityCalendarIcon } from "@/assets/icons";
import { Switch } from "@/components/ui/switch";

export default function AddCouponForm() {
  return (
    <div className="p-10 flex flex-col border rounded-lg">
      <div className="flex flex-col border divide-y-[1.5px] rounded-lg overflow-hidden">
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Coupon
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              value=""
              placeholder="Enter Coupon Code"
            />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Discount
          </div>
          <div className="min-w-20 max-w-20 flex items-center justify-center text-nowrap">
            %
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Validity
          </div>
          <div className="min-w-20 max-w-20 flex items-center justify-center text-nowrap">
            <ValidityCalendarIcon />
          </div>
          <div className="w-full grid grid-cols-2 divide-x-[1.5px]">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Enter Date"
            />
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Enter Time"
            />
          </div>
          <div className="flex justify-center items-center px-4">
            <Switch />
          </div>
        </div>
        <div className="flex divide-x-[1.5px]">
          <div className="min-w-48 flex items-center text-nowrap px-5">
            Limit
          </div>
          <div className="w-full">
            <input
              className="h-12 w-full px-5 outline-none"
              placeholder="Enter Use Limit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
