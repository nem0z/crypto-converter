import { currency } from "../types";

class CoinGeckoApi {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    get(target: string = 'usd', nbrResult: number = 100): Promise<currency[]> {
        const url : string= this.baseUrl + `/coins/markets?vs_currency=${target}&order=market_cap_desc&per_page=${nbrResult}`;

        return fetch(url)
            .then(res => res.json())
            .then(currencies => 
                currencies.flatMap((c: any) => ({
                    id: c.id,
                    rank: c.market_cap_rank,
                    symb: c.symbol.toUpperCase(),
                    name: c.name,
                    img: c.image,
                    price: c.current_price,
                })),
            )
            .catch(e => {
                console.error(e);
                return [];
            });
    }

}

export default CoinGeckoApi;