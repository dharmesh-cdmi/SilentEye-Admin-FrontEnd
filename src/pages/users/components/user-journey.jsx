import { Order } from "@/api/endpoints";
import {  BagIcon, } from "@/assets/icons";
import { Field, FieldVerticle } from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import useGet from "@/hooks/use-get";
import {  PanelTop, PanelTopDashed, UserRoundPlus } from "lucide-react";

const UserJourney = ({ id }) => {
  const {
    data: { data: { data: ordersData } = {} } = {},
    isLoading: ordersLoading,
  } = useGet({
    key: "ordersData",
    endpoint: Order.Order_Details + `/${id}`,
  });
  console.log(ordersData)
  return (
    <div className="pt-5 overflow-scroll h-full pb-10 no-scrollbar ">
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2 className="text-[20px] py-2 font-medium">Short Journey</h2>
          </div>
          <Field icon={<UserRoundPlus size={20} className="text-blue-500" />} title="Created" value={"Purchased"} valueicon={<BagIcon className="text-green-500" size={20} />} className={"border rounded-t-lg"}/>
          <Field  title="DEC 1, 2019 23:26" value={"DEC 7, 2019 23:26"} className={"border border-t-0 rounded-b-lg"} className2={"text-green-500"}/>
          
          <div>
            <h2 className="text-[20px] py-2 pt-5 font-medium">User Journey</h2>
          </div>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<BagIcon className="text-green-500" size={20} />}  className={"border rounded-t-lg"}/>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<PanelTopDashed className="" size={20} />}  className={"border border-t-0 "}/>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<PanelTop className="" size={20} />}  className={"border border-t-0 "}/>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<PanelTop className="" size={20} />}  className={"border border-t-0 "}/>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<PanelTop className="" size={20} />}  className={"border border-t-0 "}/>
          <FieldVerticle  title="Purchased" value="Dec 7, 2019 23:26" icon={<UserRoundPlus  className="text-green-500" size={20} />}  className={"border border-t-0 rounded-b-lg"}/>
         
        </>
      )}
    </div>
  );
};

export default UserJourney;
