import React, { useEffect, useState } from "react";
import axios from "axios";

const Newsfeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news16.p.rapidapi.com/news/top/7',
      headers: {
        'X-RapidAPI-Key': "2714acb3ecmshb0929b8c7a84381p1c3ab8jsnd5eb05a8c690",
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
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
