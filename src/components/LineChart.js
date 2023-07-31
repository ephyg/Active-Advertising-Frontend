import React from 'react'
import { Line } from 'react-chartjs-2'
import {chart as chartjs} from 'chart.js/auto'

function LineChart({chartData}) {
  return<Line data={chartData} />;
}

export default LineChart;
 