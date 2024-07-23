import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconFingerprint } from "@tabler/icons-react";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { TabularInput } from "@/components/ui/data-entry-comps";
import { isNotNullOrEmpty } from "@/lib/utils";

const managerObj = {
  order: 1,
  name: "",
  username: "",
  password: "",
  userLimit: "",
  email: "",
  whatsapp: "",
  skype: "",
};

const ManagerForm = ({ submitFunc, ...props }) => {
  const [manager, setManager] = useState(managerObj);
  const [edit, setEdit] = useState(false);

  const managerData = () => {
    const { editData } = props;
    setManager({
      _id: editData._id,
      order: editData.order,
      name: editData.name,
      username: editData.username,
      userLimit: editData.userLimit,
      email: editData.email,
      whatsapp: editData.whatsapp,
      skype: editData.skype,
    });
    setEdit(true);
  };

  useEffect(() => {
    if (isNotNullOrEmpty(props.editData.name)) {
      managerData();
    }
  }, [props.editData]);

  const closeDialog = () => {
    props.setEditData({});
    setEdit(false);
    setManager(managerObj);
    props.setOpenDialog(!props.openDialog);
  };

  return (
    <Dialog open={props.openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogTitle className="flex items-center gap-1 text-xl">
          <IconFingerprint size={30} /> Add New Account Manager
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <form
          onSubmit={(e) =>
            submitFunc(e, manager, closeDialog, edit ? "edit" : "add")
          }
          className="mt-3"
        >
          <section className="border rounded-lg mb-7">
            <section className="flex">
              <div className="text-muted-foreground h-10 border-t w-[115px] [&>h3]:text-[15px] px-3.5 py-2 font-medium">
                <h3>Order</h3>
              </div>
              <div className="flex items-center gap-[14px] font-semibold border-l w-full pl-4 [&>button>svg]:text-stone-300 [&>button>svg]:w-[18px] [&>svg]:cursor-pointer">
                <button
                  className="appearance-none"
                  type="button"
                  onClick={() => {
                    manager.order !== 1 &&
                      setManager({
                        ...manager,
                        order: --manager.order,
                      });
                  }}
                >
                  <MinusCircleIcon />
                </button>
                {manager.order}
                <button
                  className="appearance-none"
                  type="button"
                  onClick={() =>
                    setManager({ ...manager, order: ++manager.order })
                  }
                >
                  <PlusCircleIcon />
                </button>
              </div>
            </section>
            <TabularInput
              label="Title"
              value={manager.name}
              onChange={(e) => setManager({ ...manager, name: e.target.value })}
            />
            <TabularInput
              label="Username"
              value={manager.username}
              onChange={(e) =>
                setManager({ ...manager, username: e.target.value })
              }
            />
            {!edit && (
              <TabularInput
                type="password"
                label="Password"
                value={manager.password}
                onChange={(e) =>
                  setManager({ ...manager, password: e.target.value })
                }
              />
            )}
            <TabularInput
              type="number"
              label="Users"
              placeholder="Enter Users Limits For One Round"
              value={manager.userLimit}
              onChange={(e) =>
                setManager({ ...manager, userLimit: e.target.value })
              }
            />
            <TabularInput
              type="email"
              label="Email"
              placeholder="Email Address"
              value={manager.email}
              onChange={(e) =>
                setManager({ ...manager, email: e.target.value })
              }
            />
            <TabularInput
              label="Whatsapp"
              placeholder="Whatsapp Link"
              value={manager.whatsapp}
              onChange={(e) =>
                setManager({ ...manager, whatsapp: e.target.value })
              }
            />
            <TabularInput
              label="Skype"
              placeholder="Skype Link"
              value={manager.skype}
              onChange={(e) =>
                setManager({ ...manager, skype: e.target.value })
              }
            />
          </section>
          <section className="flex gap-4 [&>button]:text-base">
            <Button
              type="button"
              variant="outline"
              className="border border-stone-300 font-semibold"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button className="w-full">Add & Save Account Manager</Button>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerForm;
