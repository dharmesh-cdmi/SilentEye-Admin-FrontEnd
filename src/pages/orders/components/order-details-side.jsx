import { Order } from "@/api/endpoints";
import { AmountIcon, EmailIcon, PurchasedIcon, WebIcon } from "@/assets/icons";
import { InputField } from "@/components/common/common-form";

import Loader from "@/components/common/loader";
import useGet from "@/hooks/use-get";
import { cn } from "@/lib/utils";

const OrderDetailsSide = ({ id }) => {
  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
  } = useGet({
    key: "ordersData",
    endpoint: Order.Order_Details + `/${id}`,
  });
  return (
    <div className="pt-5 overflow-scroll h-full pb-10 no-scrollbar ">
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2 className="text-[20px] py-2 font-medium">Order Details</h2>
          </div>
          <Field icon={<EmailIcon size={20} className="text-gray-700" />} title="Email" value={ordersData?.order?.orderDetails?.email}  className={"border rounded-t-lg"}/>
          <Field icon={<WebIcon width={19}  className="text-gray-700 text-3xl" />} title="Country" value={ordersData?.order?.orderDetails?.country} className={"border border-t-0"}/>
          <Field icon={<PurchasedIcon width={20} className="text-gray-700" />} title="Purchase" value={ordersData?.order?.orderDetails?.purchase} className={"border border-t-0"}/>
          <Field icon={<AmountIcon size={20} className="text-gray-700" />} title="Total" value={"$"+ordersData?.order?.orderDetails?.total} className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
        
          <div>
            <h2 className="text-[20px] py-2 pt-5 font-medium">Plan Details</h2>
          </div>
          <Field  title="Plan" value={ordersData?.order?.planDetails?.planName}  className={"border rounded-t-lg"}/>
          <Field  title="Amount" value={"$"+ordersData?.order?.planDetails?.amount} className={"border border-t-0"} className2={"text-green-500"}/>
          <Field  title="MRP" isdel={true} value={"$"+ ordersData?.order?.planDetails?.mrp} className={"border border-t-0"}/>
          <Field valueicon={<AmountIcon size={20} className="text-gray-700" />} title="UpSell" value="Couple" className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
          <Field  title="Duration" value={ordersData?.order?.planDetails?.duration} className={"border border-t-0"}/>
          <Field  title="Discount" value={ordersData?.order?.planDetails?.discount} className={"border border-t-0"} className2={"text-red-500"}/>
          <Field  title="Coupon" value={ordersData?.order?.planDetails?.coupon} className={"border border-t-0"} className2={""}/>

          <div>
            <h2 className="text-[20px] py-2 pt-5 font-medium">Add Ons</h2>
          </div>
          {
            ordersData?.order?.addOns?.map( item =>(
                <div key={item._id} className="py-3">
                    <Field  title="Name" value={item?.name}  className={"border rounded-t-lg"} />
                    <Field  title="Amount" value={"$"+item?.amount}  className={"border border-t-0"} className2={"text-green-500"} />
                    <Field  title="MRP" value={item?.mrp}  className={"border border-t-0"} />
                    <Field  title="Descripton" value={item?.description}  className={"border border-t-0 rounded-b-lg"} />
                </div>
            ))
          }
         
        </>
      )}
    </div>
  );
};

const Field = ({icon,title,value,className,valueicon,className2,isdel}) => (
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
            {
                isdel ? <del>{value}</del> : value
            }
        </div>
      </div>
    </div>
  </InputField>
);
export default OrderDetailsSide;
