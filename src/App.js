import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        console.log(res.data);
        setCoins(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="search"
            className="coin-input"
            onChange={(event) => {
              setSearch(event.target.value);
              console.log(search);
            }}
          ></input>
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return <Coin props={coin} key={coin.id} />;
      })}
    </div>
  );
}

export default App;
