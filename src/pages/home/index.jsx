import { Download } from "lucide-react";
import LineChart from "./components/charts/LineChart";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import HomeCard from "./components/HomeCard";
import useGet from "@/hooks/use-get";
import { Dashboard } from "@/api/endpoints";
import useFilteredParams from "@/hooks/useFilterParams";
import Loader from "@/components/common/loader";
import { DataTable } from "@/components/common/Table/data-table";
import { CountryColumn } from "./components/countryColumn";
import { fileDownload, fileDownloadPost } from "@/lib/utils";
import CommonButton from "@/components/ui/common-button";
import { useState } from "react";
import Header from "@/components/common/header";

const Home = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleDateRangeUpdate = (range) => {
    setDateRange(range);
  };

  const analyticsFilter = {
    startDate: dateRange.from || null,
    endDate: dateRange.to || null,
  };
  const filterParams = useFilteredParams(analyticsFilter);

  const {
    data: { data: { data: tableData } = {} } = {},
    isLoading: TableLoading,
  } = useGet({
    key: "tableData",
    endpoint: `${Dashboard.Table}?groupBy=country`,
  });

  const {
    data: { data: { data: planData } = {} } = {},
    isLoading: planDataLoading,
  } = useGet({
    key: "planData",
    endpoint: `${Dashboard.Table}?groupBy=plan`,
  });

  const {
    data: { data: { data: analyticsData } = {} } = {},
    isLoading: analyticsLoading,
  } = useGet({
    key: "analyticsData",
    endpoint: `${Dashboard.Analytics}?${new URLSearchParams(filterParams)}`,
  });

  const handleDownload = async () => {
    await fileDownload(Dashboard.DownloadAnalytics, "Analytics");
  };

  const handleDownloadUserStatistics = async () => {
    await fileDownloadPost(
      `${Dashboard.DownloadUserStatistics}?groupBy=country`,
      "UserStatistics"
    );
  };

  return (
    <>
      {showAll ? (
        <>
          <Header
            title="User Statistics by Country"
            className=" "
            onClickhandle={() => setShowAll(false)}
          >
            <DateRangePicker onUpdate={handleDateRangeUpdate} />
            <CommonButton
              variant="ghost"
              className="h-11 rounded-md px-3 mb-1"
              onClick={handleDownloadUserStatistics}
            >
              <Download className="w-7 h-7 p-1 text-primary" />
            </CommonButton>
          </Header>

          <DataTable
            data={tableData?.userStatistics?.data || []}
            columns={CountryColumn({ type: "country" })}
            className={"rounded-t-lg"}
            classNameHeader={"bg-gray-100 py-2 rounded-t-lg"}
            pagination={{
              limit,
              setLimit,
              currentPage,
              setCurrentPage,
              totalData: tableData?.userStatistics?.data?.totalData,
            }}
          />
        </>
      ) : (
        <>
          {(analyticsLoading || TableLoading || planDataLoading) &&
          !analyticsData?.graphData?.result < 0 &&
          !analyticsData?.graphData?.Months < 0 ? (
            <Loader />
          ) : (
            <div>
              <div className="flex items-center justify-start space-y-2">
                <div>
                  <DateRangePicker onUpdate={handleDateRangeUpdate} />
                </div>
                <div className="flex justify-center items-center space-x-2 ml-5 mb-2">
                  <CommonButton
                    variant="ghost"
                    className="h-11 rounded-md px-3 mb-1"
                    onClick={handleDownload}
                  >
                    <Download className="w-7 h-7 p-1 text-primary" />
                  </CommonButton>
                </div>
              </div>
              <div className="w-full bg-white border rounded-xl min-h-[340px] p-5 shadow-md mt-[30px]">
                {analyticsData?.graphData?.result?.length < 0 ||
                analyticsData?.graphData?.Months?.length < 0 ? (
                  <Loader />
                ) : (
                  <LineChart
                    data={
                      analyticsData?.graphData?.result?.length > 0
                        ? analyticsData?.graphData?.result
                        : []
                    }
                    categories={
                      analyticsData?.graphData?.Months?.length > 0
                        ? analyticsData?.graphData?.Months
                        : []
                    }
                  />
                )}
              </div>

              <div className="mt-[30px] grid lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-5">
                <HomeCard
                  title="Visitor"
                  value={analyticsData?.visitorDetails?.totalVisitorsCount}
                />
                {analyticsData?.visitorDetails?.pageData?.map((item, index) => (
                  <HomeCard
                    key={index}
                    title={item?.label + `( ${item?.action} )`}
                    value={item?.totalCount}
                  />
                ))}

                {/* <HomeCard
              title="Add Ons Sales"
              value="645.21k"
              isImage={false}
              amount="$32,000.00"
            />  */}
              </div>
              <div className="mt-[30px] grid lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-5">
                <HomeCard
                  title="Payment Initiated"
                  value={analyticsData?.orders?.paymentInitiated?.count}
                  isImage={false}
                  amount={"$" + analyticsData?.orders?.paymentInitiated?.amount}
                />
                <HomeCard
                  title="Total Order"
                  value={analyticsData?.orders?.totalOrder?.count}
                  isImage={false}
                  amount={"$" + analyticsData?.orders?.totalOrder?.amount}
                />
                <HomeCard
                  title="Total Purchased User"
                  value={analyticsData?.orders?.totalPurchaseUsers?.count}
                  isImage={false}
                  amount={
                    "$" + analyticsData?.orders?.totalPurchaseUsers?.amount
                  }
                />
                <HomeCard
                  title="Conversion"
                  value={analyticsData?.orders?.conversionRate}
                />
                <HomeCard
                  title="Logged In Users"
                  value={analyticsData?.totalLoggedInUser}
                />
              </div>
              <div className="mt-[30px] grid lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-5">
                <HomeCard
                  title="Support Tickets"
                  value={analyticsData?.totalSupportTicket}
                />
                <HomeCard
                  title="Refund Request"
                  value={
                    analyticsData?.orders?.refundData?.refundRequests?.count
                  }
                  isImage={false}
                  amount={
                    "$" +
                    analyticsData?.orders?.refundData?.refundRequests?.amount
                  }
                />
                <HomeCard
                  title="Total Refunds"
                  value={
                    analyticsData?.orders?.refundData?.totalRefundRequests
                      ?.count
                  }
                  isImage={false}
                  amount={
                    "$" +
                    analyticsData?.orders?.refundData?.totalRefundRequests
                      ?.amount
                  }
                />
                <HomeCard
                  title="True Refunds"
                  value={analyticsData?.orders?.refundData?.trueRefunds?.count}
                  isImage={false}
                  amount={
                    "$" + analyticsData?.orders?.refundData?.trueRefunds?.amount
                  }
                />
                <HomeCard
                  title="Contact Us"
                  value={analyticsData?.totalContactFormSubmited}
                />
              </div>
              <div className="py-5">
                <div className="flex justify-between ">
                  <h2 className="text-[20px] font-semibold pb-5">
                    User Statistics By Country
                  </h2>
                  <h2
                    className="text-[16px] text-gray-500 font-semibold cursor-pointer hover:text-gray-700"
                    onClick={() => setShowAll(true)}
                  >
                    See All
                  </h2>
                </div>

                <DataTable
                  data={tableData?.userStatistics?.data || []}
                  columns={CountryColumn({ type: "country" })}
                  isPaginate={false}
                  className={"rounded-t-lg"}
                  classNameHeader={"bg-gray-100 py-2 rounded-t-lg"}
                />
              </div>
              <div className="py-5">
                <h2 className="text-[20px] font-semibold pb-5">
                  User Statistics By Plans & Add Ons
                </h2>
                <DataTable
                  data={
                    planData?.userStatistics?.data?.userStatistics?.data || []
                  }
                  columns={CountryColumn({ type: "plan" })}
                  isPaginate={false}
                  className={"rounded-t-lg"}
                  classNameHeader={"bg-gray-100 py-2 rounded-t-lg"}
                />
              </div>
              {/* <div className="py-5 grid lg:grid-cols-2 grid-cols-1 ">
            <div>
              <h2 className="text-[20px] font-semibold">
                User Statistics By Product & Shipping
              </h2>
            </div>
            <div>
              <h2 className="text-[20px] font-semibold">
                User Statistics By Product & Shipping
              </h2>
            </div>
          </div> */}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Home;
