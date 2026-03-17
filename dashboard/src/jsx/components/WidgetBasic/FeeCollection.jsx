import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class FeeCollection extends Component {
  render() {
    const data = {
      labels: [7, 6, 8, 7, 3, 8, 3, 3, 6, 5, 9, 2, 8],
      datasets: [
        {
          label: "My First dataset",
          data: [7, 6, 8, 7, 3, 8, 3, 3, 6, 5, 9, 2, 8],
          backgroundColor: "#0074FF",
          borderColor: "#0074FF",
          borderWidth: 3,
          strokeColor: "#0074FF",
          capBezierPoints: !0,
          pointColor: "#fff",
          pointBorderColor: "#fff",
          pointBackgroundColor: "#0074FF",
          pointBorderWidth: 3,
          pointRadius: 0,
          pointHoverBackgroundColor: "#FFF",
          pointHoverBorderColor: "#0074FF",
          pointHoverRadius: 0,
		  fill: true,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
      plugins:{
		  legend: {
			display: false,
			labels: {
			  usePointStyle: false,
			},
		  }
	  },
      scales: {
        x:
          {
            display: false,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: false,
              labelString: "Month",
            },
          },
        
        y:
          {
            display: false,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
          borderWidth: 0,
        },
      },
      title: {
        display: false,
      },
    };
    return (
      <div style={{ height: 140 }}>
        <Line data={data} options={options} height={140} />
      </div>
    );
  }
}

export default FeeCollection;
