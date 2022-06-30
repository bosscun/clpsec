import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DataChart } from '../../../interfaces/LineChart';

type LineChartProps = {
  data: DataChart
  title: string
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
}

const LineChart:React.FC<LineChartProps> = ({data, title}) => {
  return (
    <div className='container-sm'>
      <Line options={options(title)} data={data}/>
    </div>
  );
}

export default LineChart;
