import { Order } from "@/api/endpoints";
import { AmountIcon, EmailIcon, PurchasedIcon, WebIcon } from "@/assets/icons";
import InputField from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import useGet from "@/hooks/use-get";
import { cn } from "@/lib/utils";

const OrderDetailsSide = ({ id }) => {
  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
  } = useGet({
    key: "ordersData",
    endpoint: Order.Order_Details + `?orderId=${id}`,
  });
  console.log({ ordersData });
  return (
    <div className="pt-5 overflow-scroll h-full pb-10 no-scrollbar ">
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2 className="text-[20px] py-2 font-medium">Order Details</h2>
          </div>
          <Field icon={<EmailIcon size={20} className="text-gray-700" />} title="Email" value={ordersData?.orderDetails?.email}  className={"border rounded-t-lg"}/>
          <Field icon={<WebIcon width={19}  className="text-gray-700 text-3xl" />} title="Country" value={ordersData?.orderDetails?.country} className={"border border-t-0"}/>
          <Field icon={<PurchasedIcon width={20} className="text-gray-700" />} title="Purchase" value={ordersData?.orderDetails?.purchase} className={"border border-t-0"}/>
          <Field icon={<AmountIcon size={20} className="text-gray-700" />} title="Total" value={"$"+ordersData?.orderDetails?.total} className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
        
          <div>
            <h2 className="text-[20px] py-2 pt-5 font-medium">Plan Details</h2>
          </div>
          <Field  title="Plan" value="xyz@dddd.com"  className={"border rounded-t-lg"}/>
          <Field  title="Amount" value="xyz@dddd.com" className={"border border-t-0"}/>
          <Field  title="MRP" value="xyz@dddd.com" className={"border border-t-0"}/>
          <Field valueicon={<AmountIcon size={20} className="text-gray-700" />} title="UpSell" value="Couple" className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
          <Field  title="Duration" value="Yearly" className={"border border-t-0"}/>
          <Field  title="Discount" value="$900.00" className={"border border-t-0"} className2={"text-red-500"}/>
          <Field  title="Coupon" value="NEWYEAR90%" className={"border border-t-0"} className2={""}/>

          <div>
            <h2 className="text-[20px] py-2 pt-5 font-medium">Plan Details</h2>
          </div>
          <Field  title="Plan" value="xyz@dddd.com"  className={"border rounded-t-lg"}/>
          <Field  title="Amount" value="xyz@dddd.com" className={"border border-t-0"}/>
          <Field  title="MRP" value="xyz@dddd.com" className={"border border-t-0"}/>
          <Field valueicon={<AmountIcon size={20} className="text-gray-700" />} title="UpSell" value="Couple" className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
          <Field  title="Duration" value="Yearly" className={"border border-t-0"}/>
          <Field  title="Discount" value="$900.00" className={"border border-t-0"} className2={"text-red-500"}/>
          <Field  title="Coupon" value="NEWYEAR90%" className={"border border-t-0"} className2={""}/>
        </>
      )}
    </div>
  );
};

const Field = ({icon,title,value,className,valueicon,className2}) => (
  <InputField>
    <div className={cn("flex divide-x-[1.5px]",className)}>
      <div className="min-w-36 flex items-center text-nowrap px-4 space-x-2">
        {
            icon &&  icon
        }
        <p className="text-gray-700 text-[16px]">{title}</p>
      </div>
      <div className="w-full flex items-center justify-start  ">
        {
            valueicon && <div className="pl-2">{valueicon}</div>
        }
        <div className={cn("py-2 w-full px-3 outline-none text-[16px] font-normal",className2)}>
          {value}
        </div>
      </div>
    </div>
  </InputField>
);
export default OrderDetailsSide;
