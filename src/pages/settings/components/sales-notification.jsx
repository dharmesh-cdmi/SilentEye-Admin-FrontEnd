import { SalesNotificationIcon } from "@/assets/icons";
import { TabularInput } from "@/components/ui/data-entry-comps";
import LabeledSwitch from "@/components/ui/labeled-switch";
import React from "react";

const SalesNotification = ({ salesNotification, setSalesNotification }) => {
  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<SalesNotificationIcon />}
        name="Sales Notification"
        checked={salesNotification.enable}
        onCheckedChange={(e) =>
          setSalesNotification({ ...salesNotification, enable: e })
        }
      />
      <TabularInput
        label="Name"
        value={salesNotification.name}
        onChange={(e) =>
          setSalesNotification({ ...salesNotification, name: e.target.value })
        }
      />
      <TabularInput
        label="City, State"
        value={salesNotification.city_state}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            city_state: e.target.value,
          })
        }
      />
      <TabularInput
        label="Plan Name"
        value={salesNotification.plan_name}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            plan_name: e.target.value,
          })
        }
      />
      <TabularInput
        label="Purchase Time"
        value={salesNotification.purchase_time}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            purchase_time: e.target.value,
          })
        }
      />
    </section>
  );
};

export default SalesNotification;
