import ReactApexChart from "react-apexcharts";

const ChartBarRunning4 = () => {
    const series = [
        {
            name: 'Revenue',
            data: [20, 50, 80, 60, 10, 80, 50, 40, 95, 20, 60, 85]
        },
        {
            name: 'Active Projects',
            data: [40, 25, 30, 45, 85, 25, 95, 65, 50, 55, 40, 12]
        },
    ]
    const options = {
        chart: {
            type: 'bar',
            height: 300,


            toolbar: {
                show: false,
            },

        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '45%',
                borderRadius: 3,

            },
        },
        colors: ['#1C2430', '#01BD9B'],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            fontSize: '13px',
            labels: {
                colors: '#888888',

            },
            markers: {
                width: 10,
                height: 10,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: ['var(--secondary)', 'var(--primary)'],
                radius: 30,
            }
        },
        stroke: {
            show: true,
            width: 6,
            colors: ['transparent']
        },
        grid: {
            show: true,
            borderColor: '#EEF0F7',
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
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: {
                    colors: ['#1C2430'],
                    fontSize: '13px',
                    fontFamily: 'poppins',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
                borderType: 'solid',
                color: '#1C2430',
                height: 6,
                offsetX: 0,
                offsetY: 0
            },
            crosshairs: {
                show: true,
            }
        },
        yaxis: {
            labels: {
                offsetX: -16,
                style: {
                    colors: ['#1C2430'],
                    fontSize: '15px',
                    fontFamily: 'poppins',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
        },
        fill: {
            opacity: 1,
            colors: ['var(--secondary)', 'var(--primary)'],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + ""
                }
            }
        },
        responsive: [{
            breakpoint: 575,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '1%',
                        borderRadius: -1,
                    },
                },
                chart: {
                    height: 250,
                },
                series: [
                    {
                        name: 'Projects',
                        data: [31, 40, 28, 31, 40, 28, 31, 40]
                    },
                    {
                        name: 'Projects',
                        data: [11, 32, 45, 31, 40, 28, 31, 40]
                    },

                ],
            }
        }]
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={300}
            />
        </>
    )
}

export default ChartBarRunning4;