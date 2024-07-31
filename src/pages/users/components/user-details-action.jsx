import { Order } from "@/api/endpoints";
import {
  AccessManageIcon,
  AmountIcon,
  BagIcon,
  EmailIcon,
  WebIcon,
} from "@/assets/icons";
import { Field, FieldTarget } from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import { Switch } from "@/components/ui/switch";
import useGet from "@/hooks/use-get";
import {
    Bug,
  CpuIcon,
  MonitorSmartphone,
  PenLineIcon,
  UserCheck,
  UserRoundPlus,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import WalletModal from "./wallet-modal";

const UserDetailsAction = ({ id }) => {
  const [open,setOpen] = useState(false);
  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
  } = useGet({
    key: "ordersData",
    endpoint: Order.Order_Details + `/${id}`,
  });
  return (
    <div className="pt-5  pb-10 h-full relative -mt-8 ">
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex  justify-center items-center right-0 top-0  absolute">
            <div className=" cursor-pointer hover:shadow-md flex items-center  justify-between shadow-sm shadow-gray-300  bg-white rounded-lg border h-9 space-x-2"
            onClick={()=> setOpen(true)}>
              <Wallet size={20} className="ml-2" />
              <p className="font-semibold text-[18px]">$ 200.00</p>
              <div className="bg-gray-200  h-full items-center flex justify-center rounded-r-lg px-2">
                <PenLineIcon size={20} className="" />
              </div>
            </div>
          </div>
          <div className="no-scrollbar overflow-scroll h-[100%] mt-8">
            {/* Dashboard Page Access */}
            <div className="">
              <h2 className="text-[20px] py-2 font-medium">
                Dashboard Page Access
              </h2>
              <div className="flex justify-between items-center py-2">
                <div className="flex space-x-2 items-center">
                  <CpuIcon
                    size={20}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className="text-gray-400"
                  />
                  <p className="text-gray-400">Active Account</p>
                </div>
                <Switch
                  defaultChecked={true}
                  className="data-[state=checked]:bg-[#34C759] "
                  onCheckedChange={() =>
                    //   onStateChange({ ...state, enable: !state.enable })
                    ""
                  }
                />
              </div>
              <div className="flex justify-between items-center py-1 pb-6">
                <div className="flex space-x-2 items-center">
                  <CpuIcon
                    size={20}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className="text-gray-400"
                  />
                  <p className="text-gray-400">Active Dashboard 2.0 Process</p>
                </div>
                <Switch
                  defaultChecked={true}
                  className="data-[state=checked]:bg-[#34C759] "
                  onCheckedChange={() =>
                    //   onStateChange({ ...state, enable: !state.enable })
                    ""
                  }
                />
              </div>
            </div>

            {/* User Details */}
            <div>
              <h2 className="text-[20px] py-2 font-medium">User Details</h2>
              <Field
                icon={<EmailIcon size={20} className="text-gray-700" />}
                title="Email"
                value={ordersData?.order?.orderDetails?.email}
                className={"border rounded-t-lg"}
              />
              <Field
                icon={<WebIcon width={19} className="text-gray-700 text-3xl" />}
                title="Country"
                value={ordersData?.order?.orderDetails?.country}
                className={"border border-t-0"}
              />
              <Field
                icon={
                  <UserCheck
                    absoluteStrokeWidth
                    width={19}
                    className="text-gray-700 text-3xl"
                  />
                }
                title="Status"
                value={ordersData?.order?.orderDetails?.country}
                className={"border border-t-0"}
              />
              <Field
                icon={
                  <MonitorSmartphone
                    absoluteStrokeWidth
                    width={19}
                    className="text-gray-700 text-3xl"
                  />
                }
                title="Device"
                value={ordersData?.order?.orderDetails?.country}
                className={"border border-t-0"}
              />
              <Field
                icon={<WebIcon width={19} className="text-gray-700 text-3xl" />}
                title="IP Address"
                value={ordersData?.order?.orderDetails?.country}
                className={"border border-t-0"}
              />
              <Field
                icon={
                  <AccessManageIcon
                    width={19}
                    className="text-gray-700 text-3xl"
                  />
                }
                title="Manager"
                value={ordersData?.order?.orderDetails?.country}
                className={"border border-t-0"}
              />
              <Field
                icon={<AmountIcon size={20} className="text-gray-700" />}
                title="Total"
                value={"$" + ordersData?.order?.orderDetails?.total}
                className={"border border-t-0"}
                className2={"text-green-500"}
              />
              <Field
                icon={<BagIcon size={20} className="text-gray-700" />}
                title="Order"
                value={ordersData?.order?.orderDetails?.total}
                className={"border border-t-0 rounded-b-lg"}
                className2={""}
              />
            </div>

            {/* Orders  */}
            <div>
              <h2 className="text-[20px] py-2 font-medium">
                Orders - #SE000146 (1)
              </h2>
              <Field
                title="Plan"
                value={ordersData?.order?.planDetails?.planName}
                className={"border rounded-t-lg"}
              />
              <Field
                title="Amount"
                value={"$" + ordersData?.order?.planDetails?.amount}
                className={"border border-t-0"}
                className2={"text-green-500"}
              />
              <Field
                title="MRP"
                isdel={true}
                value={"$" + ordersData?.order?.planDetails?.mrp}
                className={"border border-t-0"}
              />
              <Field
                valueicon={<AmountIcon size={20} className="text-gray-700" />}
                title="UpSell"
                value="Couple"
                className={"border border-t-0 rounded-b-lg"}
                className2={"text-green-500"}
              />
              <Field
                title="Duration"
                value={ordersData?.order?.planDetails?.duration}
                className={"border border-t-0"}
              />
              <Field
                title="Discount"
                value={ordersData?.order?.planDetails?.discount}
                className={"border border-t-0"}
                className2={"text-red-500"}
              />
              <Field
                title="Coupon"
                value={ordersData?.order?.planDetails?.coupon}
                className={"border border-t-0"}
                className2={""}
              />
            </div>

            {/* Short Journey */}
            <div>
              <h2 className="text-[20px] py-2 font-medium">Short Journey</h2>

              <Field
                icon={<UserRoundPlus size={20} className="text-blue-500" />}
                title="Created"
                value={"Purchased"}
                valueicon={<BagIcon className="text-green-500" size={20} />}
                className={"border rounded-t-lg"}
              />
              <Field
                title="DEC 1, 2019 23:26"
                value={"DEC 7, 2019 23:26"}
                className={"border border-t-0 rounded-b-lg"}
                className2={"text-green-500"}
              />
            </div>

            <div className="mb-10">
              <h2 className="text-[20px] py-2 pt-5 font-medium">Targeted Numbers</h2>
              <FieldTarget title={1} icon={<Bug size={20} />} val1="ertyui" val2="ertyui" val3="ertyui" className="border rounded-t-lg" />
              <FieldTarget title={1} icon={<Bug size={20} />} val1="ertyui" val2="ertyui" val3="ertyui" className="border border-b rounded-b-lg" />
            </div>
            {/* {ordersData?.order?.addOns?.map((item) => (
              <div key={item._id} className="py-3">
                <Field
                  title="Name"
                  value={item?.name}
                  className={"border rounded-t-lg"}
                />
                <Field
                  title="Amount"
                  value={"$" + item?.amount}
                  className={"border border-t-0"}
                  className2={"text-green-500"}
                />
                <Field
                  title="MRP"
                  value={item?.mrp}
                  className={"border border-t-0"}
                />
                <Field
                  title="Descripton"
                  value={item?.description}
                  className={"border border-t-0 rounded-b-lg"}
                />
              </div>
            ))} */}
          </div>
        </>
      )}
      <WalletModal open={open} setOpen={setOpen}/>
    </div>
  );
};

export default UserDetailsAction;
