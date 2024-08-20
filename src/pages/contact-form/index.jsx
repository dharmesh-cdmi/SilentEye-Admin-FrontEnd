import { DataTable } from "@/components/common/Table/data-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CommonSearch from "@/components/ui/search";
import ContactColums from "./components/columns";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import { ContactFormAPI } from "@/api/endpoints";
import { useMemo, useState } from "react";
import useGet from "@/hooks/use-get";

export default function ContactForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filter = useMemo(() => {
    const params = new URLSearchParams();
    params.append("pageIndex", currentPage);
    params.append("limit", limit);
    if (searchQuery) params.append("searchQuery", searchQuery);
    return params.toString();
  }, [limit, currentPage, searchQuery]);

  const {
    isLoading,
    data: { data: contactData = {} } = {},
    refetch: contactRefecth,
  } = useGet({
    key: "contactForm",
    endpoint: `${ContactFormAPI.AllData}?${filter}`,
  });

  return (
    <div>
      <Header title="Contact Form">
        <CommonSearch onSearch={setSearchQuery} />
      </Header>

      <div className="w-full">
        <Tabs orientation="vertical" defaultValue="all">
          <TabsContent value="all" className="">
            {isLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={contactData?.result?.contactsForm || []}
                columns={ContactColums(contactRefecth)}
                pagination={{
                  limit,
                  setLimit,
                  currentPage,
                  setCurrentPage,
                  totalData: contactData?.totalCount,
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
