import ReactApexChart from "react-apexcharts";

const ChartBarRunning = () => {
    const series = [
        {
            name: 'Revenue',
            data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75, 100]
        },
        {
            name: 'Active Projects',
            data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42]
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
                        data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100]
                    },
                    {
                        name: 'Projects',
                        data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42]
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

export default ChartBarRunning;