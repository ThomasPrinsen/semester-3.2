import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  // Haal coinId uit de URL parameters
  const { coinId } = useParams();

  // State variabelen voor muntgegevens en historische gegevens
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  // Haal valutanaam uit de CoinContext
  const { currency } = useContext(CoinContext);

  // State voor de geselecteerde periode voor historische gegevens
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  // Functie om muntgegevens op te halen van CoinGecko API
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs' }
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => {
        console.log('Muntgegevens:', response);
        setCoinData(response);
      })
      .catch(err => console.error(err));
  }
  
  // Functie om historische gegevens op te halen van CoinGecko API
  const fetchHistoricalData = async (period = '7') => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs' }
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${period}`, options)
      .then(response => response.json())
      .then(response => {
        console.log('Historische gegevens:', response);
        setHistoricalData(response);
      })
      .catch(err => console.error(err));
  }
  
  // useEffect om munt- en historische gegevens op te halen bij het laden van de component of bij wijzigingen in valuta of geselecteerde periode
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData(selectedPeriod);
  }, [currency, selectedPeriod]);

  // Weergave van spinner als muntgegevens of historische gegevens nog worden geladen
  if (!coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }

  // Render de muntinformatie en grafiek wanneer gegevens beschikbaar zijn
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='coin-chart'>
        <LineChart historicalData={historicalData} /> {/* Render de lijngrafiek met historische gegevens */}
        <div className='chart-buttons'>
          {['1', '7', '30', '182', '365'].map((period, index) => ( // Knoppen voor het selecteren van verschillende periodes
            <button
              key={index}
              className={`chart-button ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === '1' ? '1 uur' : 
               period === '7' ? '7 dagen' : 
               period === '30' ? '28 dagen' : 
               period === '182' ? '6 maanden' : 
               '1 jaar'}
            </button>
          ))}
        </div>
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Markt Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Huidige Prijs</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Markt Kapitalisatie</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24u Hoog</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24u Laag</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>

    </div>
  );
}

export default Coin;
