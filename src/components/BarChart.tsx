import React, { memo, useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { Post } from '../types';

interface BarChartProps {
  data: Post[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const series = useMemo(
    () => [
      {
        name: 'Body Length',
        data: data.map((item) => item.body.length),
      },
    ],
    [data]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: true } },
      xaxis: { categories: data.map((item) => `Post ${item.id}`) },
      plotOptions: { bar: { borderRadius: 5 } },
      title: { text: 'Bar Chart - Body Length', align: 'center' },
    }),
    [data]
  );

  return (
    <div data-testid="bar-chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default memo(BarChart);
