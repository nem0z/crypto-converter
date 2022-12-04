// react
import { useState, useEffect, useRef } from 'react';
import { KeyboardEvent } from 'react';

// types
import { currency, propsConverterList } from './types';

// css
import './style/listCurrencies.css';


export default function({currencies, onSelect, onClose}: propsConverterList) {

    const [match, setMatch] = useState<currency[]>(currencies);
    const ref = useRef<HTMLInputElement>(null);

    const filter = (search: string) =>  {
        const filtered = currencies.filter(c => 
            c.symb.toUpperCase().includes(search.toUpperCase())
                ||
            c.name.toLocaleUpperCase().includes(search.toUpperCase())   
        );

        setMatch(filtered);
    };

    const handleSelect = (c: currency) => {
        onSelect(c);
        onClose();
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter' && match[0]) {
            e.preventDefault();
            handleSelect(match[0]);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

    return (
        <div className='listCurrencies' ref={ref}>
                <input 
                    autoFocus
                    type="text" 
                    onChange={ e => filter(e.target.value) }
                    onKeyDown={ e => handleKeyDown(e) }
                    className='listCurrenciesInput'
                    placeholder='Search by token or project name'
                 />

                <div className='hr'></div>

                <ul className='listCurrenciesUl'>
                    { match.map((c: currency) =>                     
                        <li key={c.id} onClick={ e => handleSelect(c) }>
                            <img src={c.img} alt={c.symb}></img>
                            <div className='wrapper'>
                                <p>
                                    <span>{ c.symb }</span>
                                    <span>{ c.name }</span>
                                </p>
                                <p>
                                    <span>#{ c.rank }</span>
                                    <span>{ c.price }$</span>
                                </p>
                            </div>
                        </li>
                    ) }
                </ul>

                <div className='hr'></div>

            </div>
    );
}