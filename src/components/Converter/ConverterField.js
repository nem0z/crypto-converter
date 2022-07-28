import React from 'react';
import { ConverterListCurrencies } from './ConverterListCurrencies';
import './css/ConverterField.css';

class ConverterField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
        };
    }

    showPopUp() {
        this.setState({...this.state, showPopUp: true});
    }

    hidePopUp() {
        this.setState({...this.state, showPopUp: false});
    }

    selectCurrency(currency) {
        this.hidePopUp();
        this.props.onSelect(currency);
    }

    render() {

    	return (
			<div>
                <div className='ConverterField'>
                    <input type="text" value={this.props.value} onChange={e => this.props.onChange(this.props.currency, e.target.value)}/>
                    <button onClick={ () => this.showPopUp() }>{ this.props.currency.symbol }</button>
                </div>
            
                { 
                    this.state.showPopUp ? 
                    <ConverterListCurrencies 
                        currencies={ this.props.currencies  ?? [] }
                        onSelect={ currency => this.selectCurrency(currency) }
                    /> :
                    null
                }
            </div>
    	);
	}
}

export { ConverterField };