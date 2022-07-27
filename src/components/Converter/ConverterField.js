import React from 'react';
import { ConverterListCurrencies } from './ConverterListCurrencies';

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
                <button onClick={ () => this.showPopUp() }>{ this.props.currency.symbol }</button>

                <input type="number" value={this.props.value} onChange={e => this.props.onChange(this.props.currency, e.target.value)}/>
            
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