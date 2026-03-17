import React from "react";
import ReactApexChart from "react-apexcharts";

const OverTimeChart = () => {  
	const series = [
		{
			name: 'Incomplete',
			data: [90, 120, 120, 100, 100, 90]
		},
		{
			name: 'Complete',
			data: [50, 75, 75, 55, 55, 70]
		}
	]
	const options = {
		chart: {
			// id: 'assetDistribution',
			height: 280,
			type: "area",
			toolbar: {
				show: false,
			},				
		},
		colors:[
			"var(--bs-danger)",
			"var(--primary)"
		],
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth',
			width: 3,
		},
		legend:{
			show: false,
		},
		grid:{
			show: true,
			strokeDashArray: 3,
			borderColor: 'var(--border-light)',
		},
		yaxis: {
			min: 0,
			max: 120,
			tickAmount: 4,
			labels: {
				style: {
					colors: '#888888',
					fontSize: '14px',
				},
				formatter: function (value) {
					return value;
				}
			},
		},
		xaxis: {
			categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
			labels:{
				style: {
					colors: '#888888',
					fontSize: '12px',
				},
			},
			axisTicks : {
				show : false
			},
			axisBorder : {
				show : false
			},
		},
		fill:{
			type:'gradient',
			gradient: {
				colorStops:[ 
					[
						{
							offset: 0,
							color: 'var(--bs-danger)',
							opacity: 0.2
						},
						{
							offset: 50,
							color: 'var(--bs-danger)',
							opacity: 0.1
						},
						{
							offset: 80,
							color: 'var(--bs-danger)',
							opacity: 0
						}
					],
					[
						{
							offset: 0,
							color: 'var(--primary)',
							opacity: 0.2
						},
						{
							offset: 0.4,
							color: 'var(--primary)',
							opacity: 0.2
						},
						{
							offset: 100,
							color: 'var(--primary)',
							opacity: 0.2
						}
					],
				]
			},				
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm'
			},
		},
		responsive: [{
			breakpoint: 575,
			options: {
				chart : {					
					height:200,
				},
				stroke :{
					width : 3,
				},
				yaxis: {
					labels:{
						style: {
							fontSize: '11px',
						},
					},
				},
				xaxis: {
					labels:{
						style: {
							fontSize: '11px',
						},
					},
				},
			},
		}]
	}
	return (			
		<ReactApexChart				
			options={options}
			series={series}
			type="area"
			height={280}			
		/>
		
	);
	
}

export default OverTimeChart;