import ReactApexChart from "react-apexcharts";
const EarningPredictionChart = () => {
    const series = [
        {
            name: "2024",
            data: [3.3, 3.6, 2, 1.4, 1.2, 1.8, 1.1, 1.4, 1.5, 1.3, 3.6, 2,],
        },
        {
            name: "2023",
            data: [-2.6, -2.1, -3.5, -2.5, -1.3, -1.8, -2, -1.1, -1.4, -2.1, -3.5, -2.5,],
        },
    ];
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
            type: "bar",
            fontFamily: "inherit",
            foreColor: "#adb0bb",
            height: 300,
            stacked: true,
            offsetX: -15,
        },
        colors: ["var(--bs-primary)", "#01bd9b"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: "80%",
                columnWidth: "15%",
                borderRadius: [6],
                borderRadiusApplication: "end",
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
            padding: {
                top: 0,
                bottom: 0,
                right: 0,
            },
            borderColor: "rgba(0,0,0,0.05)",
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
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
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            labels: {
                style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
            },
        },
        yaxis: {
            tickAmount: 4,
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
                height={300}
                width="100%"
            />
        </>
    )
}
export default EarningPredictionChart