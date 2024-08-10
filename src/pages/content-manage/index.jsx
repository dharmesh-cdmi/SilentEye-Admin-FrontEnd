import { CirclePlus, Download } from "lucide-react";
import { useState } from "react";

import Loader from "@/components/common/loader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/common/header";
import CustomTabs from "@/components/common/custom-tabs";
import { DataTable } from "@/components/common/Table/data-table";
import { ContentManage } from "@/api/endpoints";
import useGet from "@/hooks/use-get";
import CommonButton from "@/components/ui/common-button";
import { FeatureColumn } from "./components/featuresColumn";
import { PagesColumn } from "./components/pagesColumn";
import Faqs from "./components/faqs";
import { ReviewsColumn } from "./components/reviewsColumn";
import { Contents, FaqsIcon, Features, Pages, Review } from "@/assets/icons";
import CommonModal from "@/components/common/modals/common-modal";
import AddFeatures from "./components/features/AddFeatures";
import { useNavigate } from "react-router-dom";
import ContentDetails from "./components/contents";
import AddReviews from "./components/reviews/AddReviews";

export default function Users() {
  // this is tabsConfig
  const tabsConfig = [
    { value: "contents", label: "Contents", icon: Contents },
    { value: "features", label: "Features", icon: Features },
    { value: "pages", label: "Pages", icon: Pages },
    { value: "faqs", label: "FAQs", icon: FaqsIcon },
    { value: "reviews", label: "Reviews", icon: Review },
  ];

  const navigate = useNavigate();

  const [featureOpen, setFeatureOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  // Features API Call
  const {
    data: { data: featuresData = {} } = {},
    isLoading: featuresLoading,
    refetch: FeatureRefetch,
  } = useGet({
    key: "featuresData",
    endpoint: ContentManage.AllFeatures,
  });

  // Pages API Call
  const {
    data: { data: pagesData = {} } = {},
    isLoading: pagesLoading,
    refetch: PageRefetch,
  } = useGet({
    key: "pagesData",
    endpoint: ContentManage.AllPages,
  });

  const {
    data: { data: reviewsData = {} } = {},
    isLoading: reviewsLoading,
    refetch: ReviewRefetch,
  } = useGet({
    key: "reviewsData",
    endpoint: ContentManage.AllReviews,
  });

  console.log("All Revies : ", reviewsData)

  const [isActive, setIsActive] = useState("contents");

  return (
    <div>
      <Header title="Content Manage" className=" ">
        {isActive === "features" ? (
          <div
            className={`flex space-x-1 cursor-pointer h-[48px] justify-center items-center  px-4 bg-primary text-white rounded-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black`}
            onClick={() => {
              setFeatureOpen(true);
            }}
          >
            <CirclePlus className="w-5 h-5 mr-2" />
            <h2>Add Feature</h2>
          </div>
        ) : isActive === "pages" ? (
          <div
            className={`flex space-x-1 cursor-pointer  h-[48px] justify-center items-center  px-4 bg-primary text-white rounded-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black`}
            onClick={() => {
              navigate("/content-manage/add-pages");
            }}
          >
            <CirclePlus className="w-5 h-5 mr-2" />
            <h2>Add Pages</h2>
          </div>
        ) : isActive === "reviews" ? (
          <div
            className={`flex space-x-1 cursor-pointer h-[48px] justify-center items-center  px-4 bg-primary text-white rounded-lg hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-bg-black`}
            onClick={() => {
              setReviewsOpen(true);
            }}
          >
            <CirclePlus className="w-5 h-5 mr-2" />
            <h2>Add Reviews</h2>
          </div>
        ) : (
          ""
        )}

        {isActive === "features" && (
          <CommonButton>
            <Download className="w-6 h-6" />
          </CommonButton>
        )}
      </Header>

      <div className="w-full">
        <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="contents"
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs
            tabs={tabsConfig}
            setIsActive={setIsActive}
            className={"mb-12 rounded-b-lg "}
          />

          <TabsContent value={"contents"} className="">
            <ContentDetails />
          </TabsContent>
          <TabsContent value={"features"} className="">
            {featuresLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={featuresData?.features || []}
                columns={FeatureColumn({
                  tabKey: isActive,
                  FeatureRefetch: FeatureRefetch,
                })}
                className={"rounded-t-lg"}
              />
            )}
          </TabsContent>
          <TabsContent value={"pages"} className="">
            {pagesLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={pagesData?.pages || []}
                columns={PagesColumn({
                  tabKey: isActive,
                  PageRefetch: PageRefetch,
                })}
                className="rounded-t-lg"
              />
            )}
          </TabsContent>

          <TabsContent value={"faqs"} className="">
            <Faqs />
          </TabsContent>
          <TabsContent value={"reviews"} className="">
            {reviewsLoading ? (
              <Loader />
            ) : (
              <DataTable
                data={reviewsData?.reviews || []}
                columns={ReviewsColumn({
                  tabKey: isActive,
                  ReviewRefetch: ReviewRefetch
                })}
                className="rounded-t-lg"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <CommonModal
        open={featureOpen}
        setOpen={setFeatureOpen}
        title={"Add New Features"}
        width={800}
      >
        <AddFeatures setOpen={setFeatureOpen} Refetch={FeatureRefetch} />
      </CommonModal>
      <CommonModal
        open={reviewsOpen}
        setOpen={setReviewsOpen}
        title={"Add Review"}
        width={800}
      >
        <AddReviews setOpen={setReviewsOpen} Refetch={ReviewRefetch} />
      </CommonModal>


    </div>
  );
}
