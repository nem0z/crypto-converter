class CoinGeckoApi {
    constructor(nbrCurrencies = 100, validDuration = 0) {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.nbrCurrencies = nbrCurrencies;
        this.validDuration = validDuration;
        this.currencies = [];
        this.lastUpdate = validDuration + 1;
    }

    getCurrencies(target = 'usd') {
        if(this.lastUpdate + this.validDuration > Date.now()) return this.currencies;

        let url = this.baseUrl + `/coins/markets?vs_currency=${target}&order=market_cap_desc&per_page=250`;

        return fetch(url)
            .then(res => res.json())
            .then(currencies => 
                currencies.flatMap(c => ({
                    id: c.id,
                    rank: c.market_cap_rank,
                    symbol: c.symbol.toUpperCase(),
                    name: c.name,
                    image: c.image,
                    price: c.current_price,
                })),
            )
            .then(currencies => {
                this.currencies = currencies;
                this.lastUpdate = Date.now();
                return { currencies: currencies, lastUpdate: this.lastUpdate };
            });
    }

}

export default CoinGeckoApi;