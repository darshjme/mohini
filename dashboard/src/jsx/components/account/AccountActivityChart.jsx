import ApexChart from "react-apexcharts";
const AccountActivityChart = () => {
	const series=[
		{
			name: 'Net Profit',
			data: [700, 650, 680, 590, 720, 610, 760, 530, 610],
		},
	]
	const options={
		chart: {
			type: 'area',
			height: 280,
			width: 835,
			toolbar: {
				show: false,
			},
			offsetX: -45,
			zoom: {
				enabled: false
			},
		},
		colors:[
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
			curve:'straight',
			colors:['var(--primary)'],
		},
		grid: {
			show:true,
			borderColor: '#eee',
			
			xaxis: {
				lines: {
					show: true
				}
			},   
			yaxis: {
				lines: {
					show: false
				}
			},  
		},
		yaxis: {
			show: true,
			tickAmount: 4,
			min: 0,
			max: 800,
			labels:{
				offsetX:50,
			}
		},
		xaxis: {
			categories: [
				'May',
				'June',
				'July',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			],
			overwriteCategories: undefined,
			
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: true,
				offsetX: 25,
				
				style: {
					fontSize: '12px',
				}
			},
		},
		fill: {
			opacity: 0.5,
			colors:'var(--primary)',
			type: 'gradient', 
			gradient: {
				colorStops:[
					{
						offset: 0.6,
						color: 'var(--primary)',
						opacity: .2
					},
					{
						offset: 0.6,
						color: 'var(--primary)',
						opacity: .15
					},
					{
						offset: 100,
						color: 'var(--primary)',
						opacity: 0
					},
				],
			}
		},
		tooltip: {
			enabled:true,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + ""
				}
			}
		}
	}
	return( 
		<>
			<ApexChart type="area" series={series} options={options} height={280} width={835}/>
		</>
	)
}
    
export default AccountActivityChart;
