import {
  ActionIcon,
  EditIcon,
  EyeIcon,
  IdendityIcon,
  ListIcon,
  RedirectIcon,
  TrashIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Header = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-base text-nowrap text-black font-medium">
    {children}
  </div>
);

export const columns = [
  {
    accessorKey: "order",
    header: () => <Header>Order</Header>,
    cell: ({ row }) => (
      <div className="text-nowrap text-base text-black font-medium">
        {row.getValue("order")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => (
      <Header>
        <IdendityIcon size={23} />
        Title
      </Header>
    ),
    cell: ({ row }) => (
      <div className="text-nowrap text-base text-black font-medium min-w-full">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "users",
    header: () => (
      <Header>
        <ListIcon size={23} />
        Users
      </Header>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-nowrap text-base text-black font-medium">
        {row.getValue("users")} Users <RedirectIcon size={18} />
      </div>
    ),
  },
  {
    accessorKey: "isLive",
    header: () => (
      <Header>
        <EyeIcon />
        Live
      </Header>
    ),
    cell: ({ row }) => {
      let isLive = row.getValue("isLive");
      return (
        <div className="text-base font-medium">
          <Switch
            className="data-[state=checked]:bg-[#34C759]"
            checked={isLive}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <Header>
        <ActionIcon />
        Action
      </Header>
    ),
    cell: () => (
      <div className="flex gap-1.5">
        <Button className="h-9 w-9 p-1.5 bg-white text-black hover:bg-blue-600 hover:text-white border rounded-lg shadow-md duration-200">
          <EditIcon />
        </Button>
        <Button className="h-9 w-9 p-1.5 bg-white text-rose-500 hover:bg-rose-600 hover:text-white border rounded-lg shadow-md duration-200">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
