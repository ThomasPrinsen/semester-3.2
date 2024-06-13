import React, { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs'
      }
    };

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/news?category=crypto', options);
      const data = await response.json();
      setNews(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="news">
      <h1>Latest Crypto News</h1>
      <div className="news-list">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="news-item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default News;
