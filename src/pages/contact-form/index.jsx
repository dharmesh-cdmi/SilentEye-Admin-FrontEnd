import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CommonSearch from "@/components/ui/search";
import ContactColums from "./components/columns";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { ContactFormAPI } from "@/api/endpoints";
import useGet from "@/hooks/use-get";

export default function ContactForm() {
  const {
    isLoading,
    data: { data: contactData = {} } = {},
    refetch: contactRefecth,
  } = useGet({
    key: "contactForm",
    endpoint: ContactFormAPI.AllData,
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
              <DataTable
                data={contactData?.contactsForm || []}
                columns={ContactColums(contactRefecth)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
