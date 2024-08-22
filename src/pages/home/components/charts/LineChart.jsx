// src/LineChart.js
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDropdown from "@/components/common/chart-dropdown";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const LineChart = ({ data =[], categories=[] }) => {
  const [chartsData, setChartData] = useState({});
  const labels = useMemo(() => categories, [categories]);
  const [loading, setLoading] = useState(true);
  const [selectedChartList, setSelectedChartList] = useState([]);

  const colors = [
    "#245CF6",
    "#FB3E24",
    "#FFA901",
    "#09AB19",
    "#595959",
    "#AC24FF",
    "#245CF6",
    "#FB3E24",
    "#FFA901",
    "#09AB19",
    "#595959",
    "#AC24FF",
    "#245CF6",
    "#FB3E24",
    "#FFA901",
    "#09AB19",
    "#595959",
    "#AC24FF",
    "#245CF6",
    "#FB3E24",
    "#FFA901",
    "#09AB19",
    "#595959",
    "#AC24FF",
  ];

  const chartDataConfig = (data) => {
    const filteredData = data?.filter((dataset) =>
      selectedChartList?.includes(dataset?.label)
    );

    const datasets = filteredData?.map((dataset, index) => ({
      label: dataset?.label,
      data: dataset?.data,
      fill: true,
      backgroundColor: colors[index],
      borderColor: colors[index],
      tension: 0,
      datalabels: {
        anchor: "end",
        align: "end",
        padding: {
          top: 10,
          right: 0,
          bottom: 10,
          left: 0,
        },
        formatter: (value) => "$ " + `${value}`,
        color: "#fff",
      },
    }));

    setChartData({
      labels,
      datasets,
    });
  };

  useEffect(() => {
    if (data?.length > 0) {
      setSelectedChartList(data?.map((dataset) => dataset?.label)); // Set all items as selected initially
      chartDataConfig(data);
      if (data[0]?.data?.length > 0) {
        setLoading(false);
      }
    }
  }, [data]);

  useEffect(() => {
    chartDataConfig(data);
  }, [selectedChartList]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = ` Value : $${context.raw}`;
            return label;
          },
          title: function (context) {
            const date = context[0].label;
            return `Series : "${context[0].dataset.label}" Point : ${date}`;
          },
        },
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: {
          size: 10,
          weight: "normal",
        },
        bodyFont: {
          size: 10,
        },
        padding: 10,
      },
      datalabels: {
        display: true,
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    scales: {
      y: {
        display: true,
        stacked: false,
      },
    },
  };

  const renderCustomLegend = () => (
    <div className="flex flex-wrap">
      {data
        ?.filter((dataset) => selectedChartList?.includes(dataset.label))
        .map((dataset, index) => (
          <div key={dataset.label} className="flex items-center mr-4">
            <div
              style={{ backgroundColor: colors[index] }}
              className="w-4 h-4 mr-2 rounded-md"
            ></div>
            <span className="font-semibold ">{dataset.label}</span>
          </div>
        ))}
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center text-white">
          No Data Found!
        </div>
      ) : (
        <>
          <div className="">
            <div className="flex justify-between w-full">
              <div>{renderCustomLegend()}</div>
              <ChartDropdown
                data={data}
                selectedChartList={selectedChartList}
                setSelectedChartList={setSelectedChartList}
              />
            </div>
            {data[0]?.data?.length > 0 ? (
              <div className="overflow-x-auto custom-scrollbar">
                <div className="min-w-[650px] min-h-[270px] py-2">
                  <Line data={chartsData} options={options} />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center text-white">
                No Data Found!
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LineChart;
