class CoinGeckoApi {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    getCurrencies(target = 'usd') {
        let url = this.baseUrl + `/coins/markets?vs_currency=${target}&order=market_cap_desc&per_page=250`;

        return fetch(url)
            .then(res => res.json())
            .then(currencies => ({
                    data: currencies.map(c => ({
                        id: c.id,
                        symbol: c.symbol,
                        name: c.name,
                        image: c.image,
                        price: c.current_price,
                    })),
                    time: Date.now(),
                })
            );
    }

}

export default CoinGeckoApi;