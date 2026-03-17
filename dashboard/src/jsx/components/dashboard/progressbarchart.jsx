import ReactApexChart from "react-apexcharts";

const ProgressBarChart = () => {
    const series = [75];
    const options={
        chart: {
            type: 'radialBar',
            offsetY: 0,
            height: 160,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -180,
                endAngle: 180,
                track: {
                    background: "#F1EAFF",
                    strokeWidth: '100%',
                    margin: 3,
                },

                hollow: {
                    margin: 20,
                    size: '60%',
                    background: 'transparent',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                },

                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 5,
                        fontSize: '24px',
                        color: '#000000',
                        fontWeight: 600,
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 1600,
            options: {
                chart: {
                    height: 150
                },
            }
        }

        ],
        grid: {
            padding: {
                top: -10
            }
        },
        /* stroke: {
          dashArray: 4,
          colors:'#6EC51E'
        }, */
        fill: {
            type: 'gradient',
            colors: '#1C2430',
            gradient: {
                shade: 'F9F9FB',
                type: 'horizontal',
                shadeIntensity: 0.1,
                gradientToColors: ['#7A849B'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [,120]
            },
        },
        
        labels: ['Average Results'],
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={160}
            />
        </>
    )
}

export default ProgressBarChart