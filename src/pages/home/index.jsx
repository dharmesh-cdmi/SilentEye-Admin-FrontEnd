import { Button } from "@/components/custom/button";
import { Download } from "lucide-react";
import LineChart from "./components/charts/LineChart";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import HomeCard from "./components/HomeCard";


const home = () => {
  const testData = [
    {
      label: "Checkout Page Visitor",
      data: [30, 40, 45, 50, 49, 60, 70, 60,20,10,8],
    },
    {
      label: "Plan Page Visitor",
      data: [20, 30, 25, 35, 44, 55, 65, 60,20,10,9],
    },
    {
      label: "Demo Viewer",
      data: [25, 35, 30, 40, 38, 50, 60, 60,20,10,11],
    },
    {
      label: "Total Order",
      data: [15, 25, 20, 30, 28, 40, 50, 60,20,10,20],
    },
    {
      label: "Logged in Users",
      data: [20, 19, 17, 23, 29, 39, 49, 60,20,10,5],
    },
    {
      label: "True Refunds",
      data: [10, 20, 15, 25, 23, 35, 45, 60,20,10,17],
    },
  ];

  const testCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct"];
  return (
    <div>
     
      <div className="flex items-center justify-start space-y-2">
        <div>
          <DateRangePicker showCompare={false}/>
        </div>
        <div className="flex justify-center items-center space-x-2 ml-5 mb-2">
          <Button variant="ghost" className="h-11 rounded-md px-3 mb-1">
            <Download className="w-7 h-7 p-1 text-primary" />
          </Button>
        </div>
      </div>
      <div className="w-full bg-white border rounded-xl h-[324px] p-5 shadow-md mt-[30px]">
        <LineChart data={testData} categories={testCategories} />
      </div>

      <div className="mt-[30px] grid grid-cols-5 gap-5">
        <HomeCard title="Visitor" value="645.21k" />
        <HomeCard title="Demo Viewer" value="645.21k" />
        <HomeCard title="Plan Page Visitor" value="645.21k" />
        <HomeCard title="Checkout Page Visitor" value="645.21k" />
        <HomeCard title="Add Ons Sales" value="645.21k" isImage={false} amount="$32,000.00" />
      </div>
      <div className="mt-[30px] grid grid-cols-5 gap-5">
        <HomeCard title="Payment Initiated" value="645.21k" isImage={false} amount="$32,000.00"/>
        <HomeCard title="Total Order" value="645.21k" isImage={false} amount="$42,000.00"/>
        <HomeCard title="Total Purchased User" value="645.21k" isImage={false} amount="$52,000.00"/>
        <HomeCard title="Conversion" value="645.21k" />
        <HomeCard title="Logged In Users" value="645.21k" />
      </div>
      <div className="mt-[30px] grid grid-cols-5 gap-5">
        <HomeCard title="Support Tickets" value="645.21k" />
        <HomeCard title="Refund Request" value="645.21k" isImage={false} amount="$82,000.00000"/>
        <HomeCard title="Total Refunds" value="645.21k" isImage={false} amount="$22,000.0000"/>
        <HomeCard title="True Refunds" value="645.21k" isImage={false} amount="$62,000.009000"/>
        <HomeCard title="Contact Us" value="645.21k" />
      </div>
    </div>
  );
};
export default home;
