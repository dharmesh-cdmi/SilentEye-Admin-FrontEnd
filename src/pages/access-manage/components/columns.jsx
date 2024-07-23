import { EyeIcon, IdendityIcon, ListIcon, RedirectIcon } from "@/assets/icons";
import { Switch } from "@/components/ui/switch";

export const Header = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
    {children}
  </div>
);

export let columns = [
  {
    accessorKey: "order",
    header: () => <Header>Order</Header>,
    cell: ({ row }) => (
      <div className="text-nowrap text-base text-black font-medium">
        {row.getValue("order") || 1}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <Header>
        <IdendityIcon size={23} />
        Title
      </Header>
    ),
    cell: ({ row }) => (
      <div className="text-nowrap text-base text-black font-medium min-w-full">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "userLimit",
    header: () => (
      <Header>
        <ListIcon size={23} />
        Users
      </Header>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-nowrap text-base text-black font-medium">
        {row.getValue("userLimit")} Users <RedirectIcon size={18} />
      </div>
    ),
  },
  {
    accessorKey: "live",
    header: () => (
      <Header>
        <EyeIcon />
        Live
      </Header>
    ),
    cell: ({ row }) => {
      let live = row.getValue("live");
      return (
        <div className="text-base font-medium">
          <Switch
            className="data-[state=checked]:bg-[#34C759]"
            checked={live || true}
          />
        </div>
      );
    },
  },
];
