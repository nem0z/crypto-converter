import CoinGeckoApi from "../src/modules/CoinGeckoApi.js";

const api = new CoinGeckoApi();

let cryptos = await api.getCurrencies();
console.log(cryptos);