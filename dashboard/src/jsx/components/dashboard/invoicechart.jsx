import ReactApexChart from "react-apexcharts";
const InvoiceChart = () => {
    const series = [
        {
            name: 'Net Profit',
            data: [100, 300, 200, 400, 200],
            /* radius: 30,	 */
        },
    ]
    const options = {
        chart: {

            type: 'area',
            height: 70,
            width: 100,

            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            }

        },

        colors: ['var(--primary)'],
        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 3,
            curve: 'smooth',
            colors: ['var(--primary)'],
        },

        grid: {
            show: false,
            borderColor: '#eee',
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0

            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0
                }
            }
        },
        xaxis: {
            categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false,
                style: {
                    fontSize: '12px',
                }
            },

            crosshairs: {
                show: false,
                position: 'front',
                stroke: {
                    width: 1,
                    dashArray: 3
                }
            },
            tooltip: {
                enabled: true,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                }
            }
        },
        yaxis: {
            show: false,            
        },
        fill: {
            type: 'gradient',
            opacity: 0.7,
            colors: 'var(--primary)',
            gradient: {
                colorStops: [

                    {
                        offset: 0,
                        color: 'var(--primary)',
                        opacity: .4
                    },
                    {
                        offset: 0.6,
                        color: 'var(--primary)',
                        opacity: .4
                    },
                    {
                        offset: 100,
                        color: 'white',
                        opacity: 0
                    }
                ],
            },
        },

        tooltip: {
            enabled: false,
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return "$" + val + " thousands"
                }
            }
        }
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={70}
                width={100}
            />
        </>
    )
}
export default InvoiceChart