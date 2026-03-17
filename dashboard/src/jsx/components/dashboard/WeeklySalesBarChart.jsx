import React from "react";
import ReactApexChart from "react-apexcharts";

const WeeklySalesBarChart = () => {
  const series = [
    {
      name: 'Sales',
      data: [28, 40, 50, 68, 30, 68, 48, 28, 20]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: false,
      height: 150,
      offsetX: -8,
      offsetY: 25,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: '30%',
        colors: {
          backgroundBarOpacity: 1,
        },
      },
    },
    colors: ['var(--primary)', 'var(--secondary)'],
    xaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: '#828282',
          fontSize: '14px',
          fontFamily: 'Poppins',
          fontWeight: 'light',
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    toolbar: {
      enabled: false,
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={150}
    />
  );
};

export default WeeklySalesBarChart;