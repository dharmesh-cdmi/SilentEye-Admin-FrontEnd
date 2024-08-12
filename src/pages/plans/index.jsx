import { useState } from "react";
import { CircleDollarSign, CirclePlus, Download, Plane } from "lucide-react";
import { AddonsIcon, OrdersIcon, ProductsIcon } from "@/assets/icons";
import Loader from "@/components/common/loader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CommonSearch from "@/components/ui/search";
import Header from "@/components/common/header";
import CommonButton from "@/components/ui/common-button";
import useGet from "@/hooks/use-get";
import CustomTabs from "@/components/common/custom-tabs";
import { DataTable } from "@/components/common/Table/data-table";
import { Addons, Plan, Product, Shipping, Upsell } from "@/api/endpoints";
import { SubscriptionColumn } from "./components/subscription/subscriptionColumn";
import { UpsellColumn } from "./components/upsell/upsellColumn";
import { AddonsColumn } from "./components/addons/addonColumn";
import { ProductsColumn } from "./components/products/productsColumn";
import { ShippingColumn } from "./components/shippings/shippingColumn";
import useFilteredParams from "@/hooks/useFilterParams";

export default function Plans() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "subscription", icon: CircleDollarSign, label: "Subscriptions" },
    { value: "upsell", icon: OrdersIcon, label: "UpSell" },
    { value: "addons", icon: AddonsIcon, label: "Add Ons" },
    { value: "products", icon: ProductsIcon, label: "Products" },
    { value: "shipping", icon: Plane, label: "Shipping" },
  ];
  const [isActive, setIsActive] = useState("subscription");
  const [searchTerm, setSearchTerm] = useState("");
  const filter = {
    // status: isActive,
    search: searchTerm || null,
  };

  const filterParams = useFilteredParams(filter);

  // Call Plan API ...
  const {
    data: { data: { data: plansData } = {} } = {},
    isLoading: PlanLoading,
    refetch: PlanRefetch,
  } = useGet({
    key: "plansData",
    endpoint: `${Plan.AllPlans}?${new URLSearchParams(filterParams)}`,
  });

  // Call UpSell API ..
  const {
    data: { data: { data: upSelldata } = {} } = {},
    isLoading: UpsellLoading,
    refetch: UpsellRefetch,
  } = useGet({
    key: "upSelldata",
    endpoint: `${Upsell.AllUpsell}?${new URLSearchParams(filterParams)}`,
  });

  // Call AddOns API ..
  const {
    data: { data: addonsData = {} } = {},
    isLoading: AddonsLoading,
    refetch: AddonsRefetch,
  } = useGet({
    key: "addonsData",
     endpoint: `${Addons.AllAddons}?${new URLSearchParams(filterParams)}`
  });

  // Call Product API ..
  const {
    data: { data: productsData = {} } = {},
    isLoading: ProductsLoading,
    refetch: ProductRefetch,
  } = useGet({
    key: "productsData",
    endpoint: `${Product.AllProduct}?${new URLSearchParams(filterParams)}`
  });

  // Call Shipping API ..
  const {
    data: { data: { data: shippingData } = {} } = {},
    isLoading: ShippingLoading,
    refetch: ShippingRefetch,
  } = useGet({
    key: "shippingData",
    endpoint: `${Shipping.AllShipping}?${new URLSearchParams(filterParams)}`
  });

  return (
    <div>
      <Header title="Plans" className=" ">
        <CommonSearch onSearch={setSearchTerm} />
        <CommonButton>
          <Download className="w-6 h-6" />
        </CommonButton>
      </Header>

      <div className="w-full">
        <Tabs orientation="vertical" defaultValue="subscription">
          <div className="flex justify-between items-center w-full border rounded-t-lg  overflow-y-hidden ">
            <div className="w-[57%] lg:w-[80%]">
              <CustomTabs
                tabs={tabsConfig}
                setIsActive={setIsActive}
                className={"border-0 "}
              />
            </div>

            <div className=" flex justify-end items-center w-[43%] lg:w-[20%] ">
              <div
                className={
                  "cursor-pointer bg-primary text-white flex justify-center items-center h-[50px] px-5  mb-0 rounded-tr-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black"
                }
                onClick={() => setIsOpen(true)}
              >
                <CirclePlus className="w-5 h-5 mr-2" />
                <p>Add</p>
              </div>
            </div>
          </div>

          <TabsContent value="subscription" className="">
            {PlanLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={plansData?.docs || []}
                columns={SubscriptionColumn({
                  tabKey: isActive,
                  PlanRefetch: PlanRefetch,
                })}
              />
            )}
          </TabsContent>
          <TabsContent value="upsell" className="">
            {UpsellLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={upSelldata?.docs || []}
                columns={UpsellColumn({
                  tabKey: isActive,
                  UpsellRefetch: UpsellRefetch,
                })}
              />
            )}
          </TabsContent>
          <TabsContent value="addons" className="">
            {AddonsLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={addonsData?.docs || []}
                columns={AddonsColumn({
                  AddonsRefetch: AddonsRefetch,
                })}
              />
            )}
          </TabsContent>
          <TabsContent value="products" className="">
            {ProductsLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={productsData?.docs || []}
                columns={ProductsColumn({
                  ProductsRefetch: ProductRefetch,
                })}
              />
            )}
          </TabsContent>
          <TabsContent value="shipping" className="">
            {ShippingLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={shippingData?.docs || []}
                columns={ShippingColumn({
                  ShippingRefetch: ShippingRefetch,
                })}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
