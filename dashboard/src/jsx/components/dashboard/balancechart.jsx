import ReactApexChart from "react-apexcharts";

const BalanceChart = () => {
    const series = [
        {
            name: "2024",
            data: [1.2, 2.7, 1, 3.6, 2.1, 2.7, 2.2,],
        },
        {
            name: "2023",
            data: [-2.8, -1.1, -2.5, -1.5, -2.3, -1.9, -1,],
        },
    ]
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
            type: "bar",
            fontFamily: "inherit",
            foreColor: "#adb0bb",
            height: 270,
            stacked: true,
            offsetX: -15,
        },
        colors: ["#1bb271", "#e55555", ],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: "60%",
                columnWidth: "20%",
                borderRadius: [2],
                borderRadiusApplication: "start",
                borderRadiusWhenStacked: "all",
            },
        },
        dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
        grid: {
            show: true,
            borderColor: '#E4E4E4',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
          yaxis: {
            min: -5,
            max: 5,
          },
          xaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            categories: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
            ],
            labels: {
              style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
            },
          },
          yaxis: {
            tickAmount: 5,
          },
          tooltip: {
            theme: "dark",
          },
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={270}
            />
        </>
    )
}

export default BalanceChart