import ReactApexChart from "react-apexcharts";

const HandleOrderChart = () => {
    const series = [
        {
            name: 'Net Profit',
            data: [200, 190, 200, 190, 205, 185, 200, 190],
        },
    ];
    const options = {
        chart: {
            type: 'area',
            height: 100,
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
        colors: ['var(--secondary)'],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
        },
        stroke: {
            show: true,
            width: 2,
            curve: 'smooth',
            colors: ['var(--secondary)'],
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August'],
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true
            },
            labels: {
                show: true,
                style: {
                    fontSize: '8px',
                }
            },
            crosshairs: {
                show: true,
                position: 'front',
                stroke: {
                    width: 0,
                    dashArray: 3
                }
            },
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 0.9,
            colors: 'var(--secondary)',
            type: 'gradient',
            gradient: {
                colorStops: [
                    {
                        offset: 0,
                        color: 'var(--secondary)',
                        opacity: .30,
                    },
                    {
                        offset: 0.6,
                        color: 'var(--secondary)',
                        opacity: .15,
                    },
                    {
                        offset: 100,
                        color: 'white',
                        opacity: 0,
                    }
                ],
            }
        },
    }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={100}
    />
  );
}

export default HandleOrderChart;