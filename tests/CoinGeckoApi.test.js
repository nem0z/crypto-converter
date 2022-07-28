import CoinGeckoApi from "../src/modules/CoinGeckoApi.js";

const api = new CoinGeckoApi(50, 5000);

let cryptos = await api.getCurrencies();
console.log(cryptos);

setTimeout(() => {
    cryptos = await api.getCurrencies();
    console.log(cryptos);
}, 5001);