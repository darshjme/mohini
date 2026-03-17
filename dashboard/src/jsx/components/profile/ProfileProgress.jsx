import ReactApexChart from "react-apexcharts";

function ProfileProgress() {
    const series = [
        {
            name: 'Net Profit',
            data: [100, 300, 200, 250, 200, 240, 180, 230, 200, 250, 300],
        },
    ]
    const options = {
        chart: {
            type: 'area',
            height: 120,
            width: 250,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            },
            // sparkline: {
            //     enabled: true
            // }
        },
        colors: [
            'var(--primary)'
        ],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 2,
            curve: 'straight',
            colors: ['var(--primary)'],
        },
        grid: {
            show: false,
            borderColor: '#eee',
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: -1
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
            categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov'],
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
                enabled: false,
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
            opacity: 0.9,
            colors: 'var(--primary)',
            // type: 'gradient', 
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
            }
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return "$" + val
                }
            }
        },
        responsive: [
            {
                breakpoint: 1600,
                options: {
                    chart: {
                        width: 153,
                    }
                },
            },
            {
                breakpoint: 1025,
                options: {
                    chart: {
                        width: 300,
                        height: 100
                    }
                },
            },
            {
                breakpoint: 575,
                options: {
                    chart: {
                        width: 191,
                    }
                },
            },
            {
                breakpoint: 425,
                options: {
                    chart: {
                        width: 100,
                        height: 100
                    }
                },
            },
        ]
    }
    return (
        <div id="chartProfileProgress" style={{ height: "100px" }}>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={120}
                width={250}
            />
        </div>
    )
}
export default ProfileProgress;