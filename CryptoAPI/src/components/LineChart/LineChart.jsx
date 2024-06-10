import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    console.log('Received Historical Data:', historicalData);
    let dataCopy = [["Date", "Prices"]];
    if (historicalData && historicalData.prices) {
      historicalData.prices.forEach(item => {
        dataCopy.push([new Date(item[0]), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height="400px"
      width="100%"
      legendToggle
    />
  );
}

export default LineChart;