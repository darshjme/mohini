import React from "react";
import ReactApexChart from "react-apexcharts";

class TopSellingChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [17, 8, 8, 17, 17, 8, 25],
		options: {
			chart: {
			  width: 280,
			  type: "donut",
			},
			plotOptions: {
				pie: {
					donut: {
						size: '90%',
						labels: {
							show: true,
							name: {
								show: true,
								offsetY: 20,
							},
							value: {
								show: true,
								fontSize: '24px',								
								fontWeight:'500',
								offsetY: -16,
							},
							total: {
								show: true,
								fontSize: '14px',
                                color:'#888888',
								fontWeight:'500',								
								label: 'Total',
							   
								formatter: function (w) {
									return w.globals.seriesTotals.reduce((a, b) => {
										return a + b
									}, 0)
								}
							}
						}
					}
				}
			},
			legend: {
                show: false,
            },
			colors: [
				'var(--primary)',
				'var(--bs-success)',
				'var(--bs-danger)',
				'var(--bs-warning)',
				'var(--bs-purple)',
				'var(--bs-dark)',
				'var(--bs-secondary)',
			],
			labels: [
				"Laptop",
				"Phone",
				"Keyboard",
				"Mouse",
				"Monitors",
				"Watch",
				"Earbuds",
			],
			dataLabels: {
				enabled: false,
			},
            stroke: {
				width: 3,
				colors: [
					'var(--bs-white)',
				],
			},
			responsive: [
				{
					breakpoint: 1480,
					options: {
						chart: {
							type: 'donut',
							width: 250,
						},
					}
				}
			]
		
		},
    };
  }

	render() {
		return (			
			<ReactApexChart
				options={this.state.options}
				series={this.state.series}
				type="donut"
				width={280}
			/>			
		);
	}
}

export default TopSellingChart;