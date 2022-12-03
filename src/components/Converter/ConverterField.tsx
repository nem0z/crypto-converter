// react
import { useRef, useState } from 'react';

// components
import ListCurrencies from './ListCurrencies';

// types
import { currency, propsConvertField, selectedCurrency } from './types';

// css
import './style/converterField.css';


export default function({currencies, current, onChange}: propsConvertField) {
    const [showList, setShowList] = useState<boolean>(false);

    return (
        <div>
            <div className='ConverterField'>
                <input 
                    type="text" 
                    placeholder='0.0' 
                    value={ current.amount ?? "" } 
                    onChange={ e => onChange({...current, amount: parseInt(e.target.value) || 0 }) }
                />
                <button onClick={ () => setShowList(true) }>
                    <img src={current.img} alt={ current.symb }></img>
                    <span>{ current.symb }</span>
                    <span><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg></span>
                </button>
            </div>
        
            { 
                showList ? 
                <ListCurrencies 
                    currencies={ currencies ?? [] }
                    onSelect={ (c: currency) => onChange({...c, amount: current.amount}) }
                    onClose={ () => setShowList(false) }
                /> :
                null
            }
        </div>
    );
}