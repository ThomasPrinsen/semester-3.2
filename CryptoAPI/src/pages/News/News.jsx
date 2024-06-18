import React, { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  // State variabelen voor nieuws en laadstatus
  const [news, setNews] = useState([]); // nieuwsitems
  const [loading, setLoading] = useState(true); // laadstatus

  // Functie om nieuws op te halen van CoinGecko API
  const fetchNews = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-8tQjAn4BiHTQUWWSB2RzdiJs'
      }
    };

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/news?category=crypto', options); // API-aanroep voor nieuwsitems
      const data = await response.json(); // JSON data van API response
      setNews(data.data); // Set de nieuwsitems in state
      setLoading(false); // Zet laadstatus naar false wanneer data geladen is
    } catch (error) {
      console.error('Fout bij ophalen nieuws:', error); // Log eventuele fouten bij het ophalen van nieuws
      setLoading(false); // Zet laadstatus naar false bij fout
    }
  };

  // useEffect om fetchNews aan te roepen bij laden van de component
  useEffect(() => {
    fetchNews();
  }, []);

  // Weergave van spinner tijdens laden van nieuws
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  // Render de lijst met nieuwsitems wanneer geladen, anders toon een bericht dat er geen nieuws beschikbaar is
  return (
    <div className="news">
      <h1>Laatste Crypto Nieuws</h1>
      <div className="news-list">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="news-item">
              <h2>{item.title}</h2> {/* Titel van het nieuwsitem */}
              <p>{item.description}</p> {/* Korte beschrijving van het nieuwsitem */}
              <a href={item.url} target="_blank" rel="noopener noreferrer">Lees meer</a> {/* Link om meer te lezen over het nieuwsitem */}
            </div>
          ))
        ) : (
          <p>Geen nieuws beschikbaar</p> // Bericht wanneer er geen nieuws beschikbaar is
        )}
      </div>
    </div>
  );
};

export default News;