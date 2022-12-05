// react
import { useEffect, useState } from 'react';

// components
import ConverterField from './ConverterField';

// types
import { currency, propsConverter, selectedCurrency } from './types';

// css
import './style/converter.css';

export default function({currencies} : propsConverter) {     

    const [from, setFrom] = useState<selectedCurrency>({
        ...(currencies.find(c => c.symb == 'BTC') ?? {} as currency),
        amount: "1"
    });
    const [to, setTo] = useState<selectedCurrency>({
        ...(currencies.find(c => c.symb == 'USDC') ?? {} as currency),
        amount: ""
    });

    useEffect(() => {
        const fromPrice = from.price ?? currencies.find(c => c.symb == from.symb)?.price ?? 0;
        const fromAmount = parseFloat(from.amount) ?? 0;      
        const toPrice = to.price ?? currencies.find(c => c.symb == to.symb)?.price ?? 0;
        const amount = fromAmount * (fromPrice / toPrice);

        setTo((prev: selectedCurrency) => ({...prev, amount: amount.toString()}));
    }, [from, to.amount, to.price]);

    return (
        <div className="Converter">
        <h1 className='title'>SwapGecko</h1>

        <ConverterField 
            currencies={ currencies }
            current={ from }
            onChange={ (c: selectedCurrency) => setFrom(c) }
        />

        <ConverterField 
            currencies={ currencies }
            current={ to }
            onChange={ (c: selectedCurrency) => setTo(c) }
        />

    </div>
    );
}