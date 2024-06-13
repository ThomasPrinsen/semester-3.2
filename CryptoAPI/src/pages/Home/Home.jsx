import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import triangleGreen from '../../assets/trianglegreen.png';
import triangleRed from '../../assets/trianglered.png';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('market_cap');

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  const sortCoins = (key) => {
    const sortedCoins = [...displayCoin].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setDisplayCoin(sortedCoins);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByChange = () => {
    setSortBy('price_change_percentage_24h');
    sortCoins('price_change_percentage_24h');
  };

  const sortByMarketCap = () => {
    setSortBy('market_cap');
    sortCoins('market_cap');
  };

  const sortByPrice = () => {
    setSortBy('current_price');
    sortCoins('current_price');
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about crypto's.</p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..' required />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p onClick={sortByPrice} className='sortable-header'>
            Price
            {sortBy === 'current_price' && (
              <img
                src={sortOrder === 'desc' ? triangleRed : triangleGreen}
                alt="Sort Indicator"
                className={sortOrder === 'asc' ? '' : 'rotated'}
              />
            )}
          </p>
          <p style={{ textAlign: "center" }} onClick={sortByChange} className="sortable-header">
            24h Change
            {sortBy === 'price_change_percentage_24h' && (
              <img
                src={sortOrder === 'desc' ? triangleRed : triangleGreen}
                alt="Sort Indicator"
                className={sortOrder === 'asc' ? '' : 'rotated'}
              />
            )}
          </p>
          <p onClick={sortByMarketCap} className='market-cap sortable-header'>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
