import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CommonSearch from "@/components/ui/search";
import { columns } from "./components/columns";
import Header from "@/components/common/header";
import useGet from "@/hooks/use-get";
import Loader from "@/components/common/loader";
import { ContactFormAPI } from "@/api/endpoints";

export default function ContactForm() {
  const { data, isLoading } = useGet({
    endpoint: ContactFormAPI.get,
  });

  return (
    <div>
      <Header title="Contact Form">
        <CommonSearch />
      </Header>

      <div className="w-full">
        <Tabs orientation="vertical" defaultValue="purchase">
          <TabsContent value="purchase" className="">
            {isLoading ? (
              <Loader />
            ) : (
              <DataTable data={data.data.contactsForm} columns={columns} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
