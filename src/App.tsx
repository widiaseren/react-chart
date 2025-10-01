import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import type { Post } from './types';
import './App.css';

const LineChart = lazy(() => import('./components/LineChart'));
const BarChart = lazy(() => import('./components/BarChart'));
const CombinedChart = lazy(() => import('./components/CombinedChart'));

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then((res) => setData(res.data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <h1>Example React ApexCharts</h1>

      {data.length > 0 ? (
        <Suspense fallback={<p>Loading charts...</p>}>
          <div className="chart-wrapper">
            <LineChart data={data} />
          </div>
          <div className="chart-wrapper">
            <BarChart data={data} />
          </div>
          <div className="chart-wrapper">
            <CombinedChart data={data} />
          </div>
        </Suspense>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
