import React, { memo, useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { Post } from '../types';

interface CombinedChartProps {
  data: Post[];
}

const CombinedChart: React.FC<CombinedChartProps> = ({ data }) => {
  const series = useMemo(
    () => [
      {
        name: 'Body Length',
        type: 'column' as const,
        data: data.map((item) => item.body.length),
      },
      {
        name: 'Title Length',
        type: 'line' as const,
        data: data.map((item) => item.title.length),
      },
    ],
    [data]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: { height: 350, type: 'line', toolbar: { show: true } },
      stroke: { width: [0, 4] },
      title: { text: 'Combined Chart - Body & Title Length', align: 'center' },
      xaxis: { categories: data.map((item) => `Post ${item.id}`) },
      yaxis: [
        { title: { text: 'Body Length' } },
        { opposite: true, title: { text: 'Title Length' } },
      ],
    }),
    [data]
  );

  return (
    <div data-testid="combined-chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default memo(CombinedChart);
