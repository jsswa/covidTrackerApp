import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = () => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infectés',
            borderColor: 'yellow',
            backgroundColor: 'rgba(238, 255, 0, 0.5)',
            fill: true,
          }, 
          {
            data: dailyData.map((data) => data.recovered),
            label: 'Guéris',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Morts',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {lineChart}
    </div>
  );
};

export default Chart;