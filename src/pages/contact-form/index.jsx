import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CommonSearch from "@/components/ui/search";
import { columns } from "./components/columns";
import Header from "@/components/common/header";
import { data } from "./data";

export default function ContactForm() {
  return (
    <div>
      <Header title="Contact Form">
        <CommonSearch />
      </Header>

      <div className="w-full">
        <Tabs orientation="vertical" defaultValue="purchase">
          <TabsContent value="purchase" className="">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
