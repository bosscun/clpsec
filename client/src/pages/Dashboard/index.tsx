import React, { useEffect, useState } from 'react';
import Box from '../../components/Box';
import BoxItem from '../../components/BoxItem';
import LineChart from '../../components/Chart/LineChart';
import { DataClick } from '../../interfaces/DataClick';
import { DataChart, DataSetItem } from '../../interfaces/LineChart';
import { socket } from '../../utils';

interface DataChartItem {
  name: string;
  orange: number;
  blue: number;
}

function DashboardPage() {
  const [dataClick, setDataClick] = useState<DataClick>({orange: 0, blue:0})
  const [dataChart, setDataChart] = useState<DataChart>({
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Blue',
        data: [0,0,0,0,0,0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Orange',
        data: [0,0,0,0,0,0],
        borderColor: 'rgb(256,165, 0)',
        backgroundColor: 'rgba(256,165, 0, 0.5)',
      },
    ]
  })
  useEffect(() => {
    socket.on('get-data-click', async(data) => {
      setDataClick(data);
    })
    socket.on('get-data-chart', async(data) => {
      const labels: string[] = data.map((item: DataChartItem) => item.name);
      const dataSets: Array<DataSetItem> = [
        {
          label: 'Blue',
          data: data.map((item: DataChartItem) => item.blue),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Orange',
          data: data.map((item: DataChartItem) => item.orange),
          borderColor: 'rgb(256,165, 0)',
          backgroundColor: 'rgba(256,165, 0, 0.5)',
        },
      ];
      setDataChart({labels, datasets: dataSets});
    })
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='mx-auto'>
      <Box>
        <BoxItem className='bg-primary'>{dataClick.blue}</BoxItem>
        <BoxItem className='bg-warning'>{dataClick.orange}</BoxItem>
      </Box>
      </div>
      <LineChart title='Chart Data Click' data={dataChart} />
    </div>
  );
}

export default DashboardPage;
