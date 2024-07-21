import { DelayIcon, SalesNotificationIcon, TimeGapIcon } from "@/assets/icons";
import { TabularInput } from "@/components/ui/data-entry-comps";
import LabeledSwitch from "@/components/ui/labeled-switch";
import { TimeDropdown } from "./core-comps";

const SalesNotification = ({ salesNotification, setSalesNotification }) => {
  return (
    <section className="rounded-xl border border-input">
      <LabeledSwitch
        logo={<SalesNotificationIcon />}
        name="Sales Notification"
        checked={salesNotification.status === "enabled"}
        onCheckedChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            status: e ? "enabled" : "disabled",
          })
        }
      />
      <section className="flex justify-between">
        <TimeDropdown
          label="Time Gap"
          icon={<TimeGapIcon size={18} />}
          labelClass="px-2"
          state={salesNotification.timeGap}
          onStateChange={(obj) =>
            setSalesNotification({ ...salesNotification, timeGap: obj })
          }
        />
        <TimeDropdown
          label="Delayed"
          icon={<DelayIcon size={18} />}
          labelClass="border-l"
          state={salesNotification.delayed}
          onStateChange={(obj) =>
            setSalesNotification({ ...salesNotification, delayed: obj })
          }
        />
      </section>
      <TabularInput
        label="Name"
        value={salesNotification.name}
        onChange={(e) =>
          setSalesNotification({ ...salesNotification, name: e.target.value })
        }
      />
      <TabularInput
        label="City, State"
        value={salesNotification.cityState}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            cityState: e.target.value,
          })
        }
      />
      <TabularInput
        label="Plan Name"
        value={salesNotification.planName}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            planName: e.target.value,
          })
        }
      />
      <TabularInput
        label="Purchase Time"
        value={salesNotification.purchaseTime}
        onChange={(e) =>
          setSalesNotification({
            ...salesNotification,
            purchaseTime: e.target.value,
          })
        }
      />
    </section>
  );
};

export default SalesNotification;
