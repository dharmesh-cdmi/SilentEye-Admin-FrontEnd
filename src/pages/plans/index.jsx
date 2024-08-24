import { useState } from "react";
import { CircleDollarSign, CirclePlus, Plane } from "lucide-react";
import {
  AddonsIcon,
  OrdersIcon,
  ProductsIcon,
  SettingIcon,
} from "@/assets/icons";
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
import CommonModal from "@/components/common/modals/common-modal";
import AddSubscription from "./components/subscription/AddSubscription";
import AddUpsell from "./components/upsell/AddUpsell";
import AddAddon from "./components/addons/AddAddon";
import AddShipping from "./components/shippings/AddShipping";
import AddProduct from "./components/products/AddProduct";
import { useNavigate } from "react-router-dom";
import LimitSelector from "@/components/common/limit-selector";

export default function Plans() {
  const navigate = useNavigate();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
    endpoint: `${Addons.AllAddons}?${new URLSearchParams(filterParams)}`,
  });

  // Call Product API ..
  const {
    data: { data: productsData = {} } = {},
    isLoading: ProductsLoading,
    refetch: ProductRefetch,
  } = useGet({
    key: "productsData",
    endpoint: `${Product.AllProduct}?${new URLSearchParams(filterParams)}`,
  });

  // Call Shipping API ..
  const {
    data: { data: { data: shippingData } = {} } = {},
    isLoading: ShippingLoading,
    refetch: ShippingRefetch,
  } = useGet({
    key: "shippingData",
    endpoint: `${Shipping.AllShipping}?${new URLSearchParams(filterParams)}`,
  });

  const [subModalOpen, setSubModalOpen] = useState(false);
  const [addonModalOpen, setAddonModalOpen] = useState(false);
  const [upsellModalOpen, setUpsellModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);

  return (
    <div>
      <Header title="Plans" className=" ">
        <CommonSearch onSearch={setSearchTerm} />
        <LimitSelector limit={limit} setLimit={setLimit} />
      </Header>

      <div className="w-full">
        <Tabs orientation="vertical" defaultValue="subscription">
          <div className="flex justify-between items-center w-full border border-b-0 rounded-t-lg  overflow-y-hidden ">
            <div className="w-[57%] lg:w-[80%]">
              <CustomTabs
                tabs={tabsConfig}
                setIsActive={setIsActive}
                className={"border-0 "}
              />
            </div>

            <div className=" flex justify-end items-center w-[43%] lg:w-[20%] ">
              {isActive === "subscription" ? (
                <div
                  className={
                    "cursor-pointer bg-primary text-white flex justify-center items-center h-[50px] px-5  mb-0 rounded-tr-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black"
                  }
                  onClick={() => {
                    setSubModalOpen(!subModalOpen);
                  }}
                >
                  <CirclePlus className="w-5 h-5 mr-2" />
                  <p className="capitalize">Add {isActive}</p>
                </div>
              ) : (
                <div
                  className={
                    "cursor-pointer bg-primary text-white flex justify-center items-center h-[50px] px-5  mb-0 rounded-tr-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black"
                  }
                  onClick={() => {
                    if (isActive === "upsell") setUpsellModalOpen(true);
                    if (isActive === "addons") setAddonModalOpen(true);
                    if (isActive === "shipping") setShippingModalOpen(true);
                    if (isActive === "products")
                      navigate("/plans/add-products");
                  }}
                >
                  <CirclePlus className="w-5 h-5 mr-2" />
                  <p className="capitalize">Add {isActive}</p>
                </div>
              )}
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
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: plansData?.totalDocs,
                }}
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
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: upSelldata?.totalDocs,
                }}
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
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: addonsData?.totalDocs,
                }}
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
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: productsData?.totalDocs,
                }}
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
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: shippingData?.totalDocs,
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CommonModal
        open={subModalOpen}
        setOpen={setSubModalOpen}
        title="Add New Subscription Plan"
      >
        <AddSubscription />
      </CommonModal>

      <CommonModal
        open={upsellModalOpen}
        setOpen={setUpsellModalOpen}
        title="Add New UpSell Plan"
      >
        <AddUpsell />
      </CommonModal>

      <CommonModal
        open={addonModalOpen}
        setOpen={setAddonModalOpen}
        title="Add New Add-Ons"
      >
        <AddAddon />
      </CommonModal>

      <CommonModal
        open={productModalOpen}
        setOpen={setProductModalOpen}
        title="Add New Product"
      >
        <AddProduct />
      </CommonModal>

      <CommonModal
        open={shippingModalOpen}
        setOpen={setShippingModalOpen}
        title="Add New Shipping"
      >
        <AddShipping />
      </CommonModal>
    </div>
  );
}
