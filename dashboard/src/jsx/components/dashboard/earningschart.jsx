import ReactApexChart from "react-apexcharts";
const EarningsChart = () => {
    const series = [60, 40];
    const options = {
        chart: {
            type: 'donut',
            width: '100'
        },
        legend: {
            show: false,

        },
        plotOptions: {
            pie: {
                offsetY: 10,
                offsetX: 25, // Adjust the horizontal offset of the pie slices
            }
        },
        colors: ['var(--rgba-primary-1)', 'var(--primary)'],
        dataLabels: {
            enabled: false, // enable data labels
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }
    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={60}
                width={100}
            />
        </>
    )
}
export default EarningsChart