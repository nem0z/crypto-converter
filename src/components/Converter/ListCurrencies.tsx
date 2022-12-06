// react
import { useState, useEffect, useRef } from 'react';
import { KeyboardEvent } from 'react';

// types
import { currency, propsConverterList } from './types';

// css
import './style/listCurrencies.css';


export default function({currencies, onSelect, onClose}: propsConverterList) {

    const [match, setMatch] = useState<currency[]>(currencies);
    const [selected, setSelected] = useState<number>(0);
    const ref = useRef<HTMLInputElement>(null);
    const ul = useRef<HTMLUListElement>(null);
    const li = useRef<HTMLLIElement>(null);

    const filter = (search: string) =>  {
        const filtered = currencies.filter(c => 
            c.symb.toUpperCase().includes(search.toUpperCase())
                ||
            c.name.toLocaleUpperCase().includes(search.toUpperCase())   
        );

        setMatch(filtered);
        setSelected(0);
    };

    const handleSelect = (c: currency) => {
        onSelect(c);
        onClose();
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter') {
            e.preventDefault();
            handleSelect(match.at(selected) ?? {} as currency);
        }

        if(e.key == 'ArrowDown') {
            e.preventDefault();
            if(selected < match.length-1) {
                setSelected(prev => prev+1);

                if(ul.current && li.current) {
                    // console.log(ul.current.offsetTop);
                    // console.log(li.current.offsetTop);
                    // console.log(li.current.clientHeight);

                    const liHeight = li.current.clientHeight;
                    const liTop = li.current.offsetTop;
                    const ulTop = ul.current.offsetTop;
                    const ulScroll = ul.current.scrollTop;
                    // liTop != ulTop && (liTop - ulTop) % (4*liHeight) == 0
                    // ulScroll + liTop > 4*liHeight

                    console.log((liTop - (ulScroll + ulTop)) % (4*liHeight));
                    
                    if(((liTop - (ulScroll + ulTop)) % (4*liHeight)) < 64) {
                        console.log("ok");
                        ul.current.scroll(0, liHeight*(selected-3));
                    }           
                }
            }
        }

        if(e.key == 'ArrowUp') {
            e.preventDefault();
            if(selected > 0) {
                setSelected(prev => prev-1);

                if(ul.current && li.current) {
                    const liHeight = li.current.clientHeight;
                    const liTop = li.current.offsetTop;
                    const ulTop = ul.current.offsetTop;
                    const ulScroll = ul.current.scrollTop;

                    if(((liTop - (ulScroll + ulTop)) % (4*liHeight)) < 64) {
                        console.log("ok");
                        ul.current.scroll(0, liHeight*(selected-5));
                    } 
                }
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: any) => { // fix any
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

                <ul className='listCurrenciesUl' ref={ul}>
                    { match.map((c: currency, i: number) =>                     
                        <li 
                            key={c.id} 
                            className={i == selected ? 'active' : ''} 
                            onClick={ e => handleSelect(c) }
                            onMouseEnter={ e => setSelected(i) }
                            ref={ i == selected ? li : null }
                        >
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