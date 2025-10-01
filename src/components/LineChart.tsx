import React, { memo, useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { Post } from '../types';

interface LineChartProps {
  data: Post[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const series = useMemo(
    () => [
      {
        name: 'Title Length',
        data: data.map((item) => item.title.length),
      },
    ],
    [data]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: 'line', toolbar: { show: true } },
      xaxis: { categories: data.map((item) => `Post ${item.id}`) },
      stroke: { curve: 'smooth' },
      title: { text: 'Line Chart - Title Length', align: 'center' },
    }),
    [data]
  );

  return (
    <div data-testid="line-chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default memo(LineChart);
