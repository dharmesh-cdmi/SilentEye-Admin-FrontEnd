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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const LineChart = ({ data, categories }) => {
  const [chartsData, setChartData] = useState({});
  const labels = useMemo(() => categories, [categories]);
  const [loading, setLoading] = useState(true);

  const colors = [
    "#245CF6",
    "#FB3E24",
    "#FFA901",
    "#09AB19",
    "#595959",
    "#AC24FF",
  ];

  const chartDataConfig = (data) => {
    const datasets = data.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      fill: true,
      backgroundColor: colors[index],
      borderColor: colors[index],
      tension: 0.4,
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
      chartDataConfig(data);
      if (data[0]?.data?.length > 0) {
        setLoading(false);
      }
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        padding: 10,
        align: "center",
        fontFamily: "Arial",
        fontWeight: 800,
        fontSize: 20,
        labels: {
        //   usePointStyle: true,
          boxWidth: 16, // Width of colored box
          padding: 3, // Padding around labels
          fontColor: "#000", // Color of labels
          borderRadius: 20,
          usePointStyle: false, 
        },
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

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center text-white">
          No Data Found!
        </div>
      ) : (
        <>
          {data[0]?.data?.length > 0 ? (
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[650px] min-h-[290px]" >
                <Line data={chartsData} options={options} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white">
              No Data Found!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LineChart;
