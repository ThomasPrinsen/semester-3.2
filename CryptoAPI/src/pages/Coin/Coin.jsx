import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs' }
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => {
        console.log('Coin Data:', response);
        setCoinData(response);
      })
      .catch(err => console.error(err));
  }
  
  const fetchHistoricalData = async (period = '7') => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs' }
    };
  
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${period}`, options)
      .then(response => response.json())
      .then(response => {
        console.log('Historical Data:', response);
        setHistoricalData(response);
      })
      .catch(err => console.error(err));
  }
  
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData(selectedPeriod);
  }, [currency, selectedPeriod]);

  if (!coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='coin-chart'>
        <LineChart historicalData={historicalData} />
        <div className='chart-buttons'>
          {['1', '7', '30', '182', '365'].map((period, index) => (
            <button
              key={index}
              className={`chart-button ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === '1' ? '1 hour' : 
               period === '7' ? '7 days' : 
               period === '30' ? '28 days' : 
               period === '182' ? '6 months' : 
               '1 year'}
            </button>
          ))}
        </div>
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24h High</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24h Low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>

    </div>
  );
}

export default Coin;
