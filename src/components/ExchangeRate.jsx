import React from "react";

const ExchangeRate = ({ exchangeRate, firstCurrencyName, secondCurrencyName }) => {
  return <div className="exchange-rate">
    <h2>Exchange Rate</h2>
    <h3>{exchangeRate}</h3>
    <p>{firstCurrencyName} to {secondCurrencyName}</p>
  </div>;
};

export default ExchangeRate;
