import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Datum", "Prijzen"]]); // Staat de initiële data array in, met headers voor de grafiek

  useEffect(() => {
    console.log('Ontvangen Historische Data:', historicalData); // Logt de ontvangen historische data naar de console
    let dataCopy = [["Datum", "Prijzen"]]; // Maakt een kopie van de data array met headers

    // Controleert of er historische data is ontvangen en voegt deze toe aan de dataCopy array
    if (historicalData && historicalData.prices) {
      historicalData.prices.forEach(item => {
        dataCopy.push([new Date(item[0]), item[1]]); // Voegt elke datum en prijs toe als een array naar dataCopy
      });
      setData(dataCopy); // Zet de volledige dataCopy array naar de state voor de grafiek
    }
  }, [historicalData]); // Voert de useEffect uit wanneer historicalData verandert

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
