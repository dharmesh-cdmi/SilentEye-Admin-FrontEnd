import { useEffect, useState } from "react";
import CustomTabs from "@/components/common/custom-tabs";
import Header from "@/components/common/header";
import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import data from "./data.json";
import {
  PlusCircleIcon,
  UserRound,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import ManagerForm from "./components/manager-form";

const AccessManage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: UserRound, label: "All" },
    { value: "active", icon: UserRoundCheck, label: "Active" },
    { value: "disabled", icon: UserRoundX, label: "Disabled" },
  ];

  const addManagerAccount = (e, manager) => {
    e.preventDefault();
    console.log(manager);
  };

  return (
    <main className="flex flex-col gap-2">
      <Header title="Access Manage" />

      <ManagerForm
        submitFunc={addManagerAccount}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="all"
          className="h-full rounded-none"
        >
          <div className="flex justify-between border border-b-0 rounded-md rounded-b-none">
            <CustomTabs tabs={tabsConfig} className="border-0" />
            <Button
              variant="outlined"
              className="text-[17px] border-l rounded-none h-12"
              onClick={() => setOpenDialog(!openDialog)}
            >
              <PlusCircleIcon className="mr-2 w-6" /> Add Account Manager
            </Button>
          </div>
          <TabsContent value="all">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="active">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="disabled">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AccessManage;
