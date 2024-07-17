import { CircleDollarSign, PlusCircle } from "lucide-react";
import PaymentGatewayForm from "./components/payment-gateway-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OrdersIcon, RefundIcons } from "@/assets/icons";
import CustomTabs from "@/components/common/custom-tabs";
import { Button } from "@/components/custom/button";
import Header from "@/components/common/header";
import { columns } from "./components/columns";
import { data } from "./data";
import { useEffect } from "react";
import adminAPI from "@/api/adminAPI";
import { API } from "@/api/endpoints";

export default function PaymentGateWay() {
  const tabsConfig = [
    { value: "all", icon: CircleDollarSign, label: "All" },
    { value: "active", icon: OrdersIcon, label: "Active" },
    { value: "disabled", icon: RefundIcons, label: "Disabled" },
  ];

  useEffect(() => {
    async function getData() {
      try {
        const response = await adminAPI.get(API.getTickets);
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }

    }

    getData()
  }, []);

  return (
    <div>
      <Header title="Payment Gateways"></Header>

      <div className="h-fit w-full relative">
        <Tabs
          orientation="vertical"
          defaultValue="all"
          className="h-full rounded-none"
        >
          <CustomTabs tabs={tabsConfig} />
          <TabsContent value="all" className="">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="active">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="disabled">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>

        <PaymentGatewayForm
          trigger={
            <Button className="h-12 flex items-center gap-1.5 absolute top-0 right-0 bg-transparent text-lg text-black hover:text-white shadow-none border-l rounded-none rounded-tr-xl">
              <PlusCircle size={20} /> Add
            </Button>
          }
          onSubmit={(data) => console.log(data)}
        >
          <DialogFooter className="flex justify-between gap-2 py-5">
            <DialogClose asChild>
              <Button className="h-12 text-lg px-10 bg-white text-black hover:bg-gray-200 border shadow">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="h-12 w-full text-lg">
              Add & Save Payment Gateway
            </Button>
          </DialogFooter>
        </PaymentGatewayForm>
      </div>
    </div>
  );
}
