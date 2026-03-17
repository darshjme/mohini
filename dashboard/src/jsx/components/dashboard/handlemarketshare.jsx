import ReactApexChart from "react-apexcharts";  

const HandleMarketShare = () => {
    const series = [12, 4, 4];
    const options = {
        chart: {
            type: 'donut',
            height: 100,
            width: 120,
        },
        labels: ["Mobile", "Laptop", "Cloths"],
        plotOptions: {
            pie: {
                donut: {
                    size: '85%',
                    labels: {
                        show: true,
                        name: {
                            show: false,
                            offsetY: 12,
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: '600',
                            offsetY: 8,

                            formatter: function (e) {
                                return parseInt(e) + "M"
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '20px',
                            fontWeight:'600',
                            offsetY: -10,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) + "M"
                            }
                        } 
                    }
                }
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
        },
        colors: ['var(--primary)', '#01BD9B', '#738293'],
        legend: {
            position: 'bottom',
            show: false
        },
        tooltip: {
            enabled: false,
        },
        states: {
            hover: {
                filter: {
                    type: "none"
                }
            },
            active: {
                filter: {
                    type: "none"
                }
            }
        },
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={100}
                width={120}
            />
        </>
    )
}

export default HandleMarketShare;