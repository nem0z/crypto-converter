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
                    <input 
                        type="text" 
                        placeholder='0.0' 
                        value={this.props.value ?? ''} 
                        onChange={e => this.props.onChange ? this.props.onChange(e.target.value) : 0.0 }
                    />

                    <button onClick={ () => this.showPopUp() }>
                        <img src={this.props.currency.image} alt={this.props.currency.id}></img>
                        <span>{ this.props.currency.symbol }</span>
                        <span><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg></span>
                    </button>
                </div>
            
                { 
                    this.state.showPopUp ? 
                    <ConverterListCurrencies 
                        currencies={ this.props.currencies  ?? [] }
                        onSelect={ currency => this.selectCurrency(currency) }
                        onClose={ () => this.hidePopUp() }
                    /> :
                    null
                }
            </div>
    	);
	}
}

export { ConverterField };