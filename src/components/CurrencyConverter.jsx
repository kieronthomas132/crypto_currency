import React, { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

const CurrencyConverter = () => {
  const currencies = ["BTC", "USD", "GBP", "ETH", "XRP", "LTC", "ADA"];
  const [primaryCurrency, setPrimaryCurrency] = useState("BTC");
  const [secondaryCurrency, setSecondaryCurrency] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);
  const [firstCurrencyName, setFirstCurrencyName] = useState("Bitcoin");
  const [secondCurrencyName, setSecondayCurrencyName] = useState("Bitcoin");

  const convert = async () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: primaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: secondaryCurrency,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
        setFirstCurrencyName(
          response.data["Realtime Currency Exchange Rate"][
            "2. From_Currency Name"
          ]
        );
        setSecondayCurrencyName(
          response.data["Realtime Currency Exchange Rate"][
            "4. To_Currency Name"
          ]
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>

      <div className="primary-currency">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency </td>
              <td>
                <input
                  type="number"
                  value={amount}
                  name="primary-amount-1"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={primaryCurrency}
                  name="primary-option-1"
                  className="currency-options"
                  onChange={(e) => setPrimaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td>Secondary Currency </td>
              <td>
                <input
                  type="number"
                  value={result}
                  name="secondary-amount-1"
                  disabled={true}
                  className="second-amount"
                />
              </td>
              <td>
                <select
                  value={secondaryCurrency}
                  name="secondary-option-1"
                  className="currency-options"
                  onChange={(e) => setSecondaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-btn" className="convert" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate
        exchangeRate={exchangeRate}
        primaryCurrency={primaryCurrency}
        secondaryCurrency={secondaryCurrency}
        firstCurrencyName={firstCurrencyName}
        secondCurrencyName={secondCurrencyName}
      />
    </div>
  );
};

export default CurrencyConverter;
