import { UserAPI } from "@/api/endpoints";
import { BagIcon } from "@/assets/icons";
import { Field, FieldVerticle } from "@/components/common/common-form";
import Loader from "@/components/common/loader";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useGet from "@/hooks/use-get";
import { formatDate } from "@/utils/dateConfig";
import { Accordion } from "@radix-ui/react-accordion";
import { PanelTop, PanelTopDashed, UserRoundPlus } from "lucide-react";

const UserJourney = ({ id }) => {
  const {
    data: { data: { data: userData } = {} } = {},
    isLoading: ordersLoading,
  } = useGet({
    key: "userData",
    endpoint: UserAPI.AllUsers + `/${id}`,
  });

  const filteredHistory =
    userData?.history?.length > 0 &&
    userData?.history?.filter(
      (item) => item.action === "Account Created" || item.action === "Purchased"
    );

  const formatHistory = (action) => {
    if (action.includes("Purchased")) {
      return <BagIcon className="px-0 text-green-500" size={20} />;
    } else if (action.includes("Demo")) {
      return <PanelTopDashed className="px-0 text-gray-700" size={20} />;
    } else if (action.includes("Account")) {
      return <UserRoundPlus className="px-0 text-blue-500" size={20} />;
    } else {
      return <PanelTop className="px-0 text-gray-700" size={20} />;
    }
  };

  return (
    <div className="pt-5 overflow-y-scroll h-full pb-10 no-scrollbar">
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          <Accordion type="simngle" collapsible>
            <AccordionItem value="uj-1" className="border-none">
              <AccordionTrigger className="py-0 hover:no-underline">
                <h2 className="text-[20px] py-2 font-medium">Short Journey</h2>
              </AccordionTrigger>
              <AccordionContent>
                <Field
                  icon={<UserRoundPlus size={20} className="text-blue-500" />}
                  title="Created"
                  value={"Purchased"}
                  valueicon={<BagIcon className="text-green-500" size={20} />}
                  className={"border rounded-t-lg"}
                />
                <Field
                  title={formatDate(filteredHistory[0]?.date)}
                  value={formatDate(filteredHistory[1]?.date) || ""}
                  className={"border border-t-0 rounded-b-lg"}
                  className2={"text-green-500"}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="simngle" collapsible>
            <AccordionItem value="uj-1" className="border-none">
              <AccordionTrigger className="py-0 hover:no-underline">
                <h2 className="text-[20px] py-2 pt-5 font-medium">
                  User Journey
                </h2>
              </AccordionTrigger>
              <AccordionContent className="border divide-y rounded-lg">
                {userData?.history?.map((item, index) => (
                  <div key={index} className="">
                    <FieldVerticle
                      className="py-0.5 px-0"
                      title={item.action}
                      value={formatDate(item.date)}
                      icon={formatHistory(item.action)}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default UserJourney;
