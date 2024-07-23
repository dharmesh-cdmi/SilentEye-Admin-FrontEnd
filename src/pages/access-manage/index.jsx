import { useEffect, useState } from "react";
import CustomTabs from "@/components/common/custom-tabs";
import Header from "@/components/common/header";
import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  PlusCircleIcon,
  UserRound,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ManagerForm from "./components/manager-form";
import axios from "axios";
import { getApiHeaders, handleApiError, isNotNullOrEmpty } from "@/lib/utils";
import { ADMIN_BASE_URL } from "@/api/adminAPI";
import { ActionIcon, EditIcon, TrashIcon } from "@/assets/icons";
import { Header as ColumnHeader, columns } from "./components/columns";

const AccessManage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [managers, setManagers] = useState([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const [editData, setEditData] = useState({});
  let count = 0;

  const handleManagerData = (managers) => {
    let arr = [];
    managers.map((ele) => {
      let managerInfo = ele.managerInfo;
      delete managerInfo._id;
      let obj = ele;
      delete obj.managerInfo;
      arr.push({ ...obj, ...managerInfo });
    });
    setManagers(arr);
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/managers`,
        getApiHeaders()
      );

      if (response.data.success) {
        handleManagerData(response.data.data.managers);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteManager = async (id) => {
    try {
      const response = await axios.delete(
        `${ADMIN_BASE_URL}/managers/${id}`,
        getApiHeaders()
      );

      if (response.data.success) {
        fetchManagers();
        alert("Manager Delete Successful");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (isNotNullOrEmpty(editData.name)) {
      setOpenDialog(true);
    }
  }, [editData]);

  const fillManagerForm = (row) => {
    setEditData(row.original);
  };

  const addActionsInColumn = () => {
    tableColumns.push({
      accessorKey: "_id",
      header: () => (
        <ColumnHeader>
          <ActionIcon />
          Action
        </ColumnHeader>
      ),
      cell: ({ row }) => (
        <div className="flex gap-1.5">
          <Button
            className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200"
            onClick={() => fillManagerForm(row)}
          >
            <EditIcon />
          </Button>
          <Button
            className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200"
            onClick={() => deleteManager(row.getValue("_id"))}
          >
            <TrashIcon />
          </Button>
        </div>
      ),
    });
    setTableColumns([...tableColumns]);
  };

  useEffect(() => {
    if (count === 0) {
      fetchManagers();
      addActionsInColumn();
      count++;
    }
  }, []);

  // this is tabsConfig
  const tabsConfig = [
    { value: "all", icon: UserRound, label: "All" },
    { value: "active", icon: UserRoundCheck, label: "Active" },
    { value: "disabled", icon: UserRoundX, label: "Disabled" },
  ];

  const editManager = async (data, reset) => {
    let id = data._id;
    delete data._id;

    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/managers/${id}`,
        {
          ...data,
          status: "active",
        },
        getApiHeaders()
      );

      if (response.data.success) {
        fetchManagers();
        reset();
        alert("Manager Edited Successfully");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const createManagerAccount = async (data, reset) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/managers`,
        {
          ...data,
          status: "active",
        },
        getApiHeaders()
      );

      if (response.data.success) {
        fetchManagers();
        reset();
        alert("Manager Created Successfully");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const checkAction = (e, data, reset, action) => {
    e.preventDefault();

    if (action === "edit") {
      editManager(data, reset);
    } else if (action === "add") {
      createManagerAccount(data, reset);
    }
  };

  return (
    <main className="flex flex-col gap-2">
      <Header title="Access Manage" />

      <ManagerForm
        submitFunc={checkAction}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        editData={editData}
        setEditData={setEditData}
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
            <DataTable data={managers} columns={tableColumns} />
          </TabsContent>
          <TabsContent value="active">
            <DataTable
              data={managers.filter((ele) => ele.status === "active")}
              columns={tableColumns}
            />
          </TabsContent>
          <TabsContent value="disabled">
            <DataTable
              data={managers.filter((ele) => ele.status === "disabled")}
              columns={tableColumns}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AccessManage;
