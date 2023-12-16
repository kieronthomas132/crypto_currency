import React, { useEffect, useState } from "react";
import axios from "axios";

const Newsfeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news16.p.rapidapi.com/news/top/7',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setArticles(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  return (
    <div className="news-feed">
      <h2>NewsFeed</h2>
      {articles.map((article) => (
        <a href={article.link} target="_blank" key={article.title} rel="noreferrer">
          <p key={article.title}>{article.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Newsfeed;
