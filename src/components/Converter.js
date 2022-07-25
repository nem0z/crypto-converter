import React from 'react';
import { ConverterButton } from './ConverterButton';
import { ConverterField } from './ConverterField';

import CoinGeckoApi from '../modules/CoinGeckoApi';

class Converter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fromCurrency: 'bitcoin',
			fromValue: 0.0,
			toCurrency: 'usd',
			toValue: 0.0,
			gecko: new CoinGeckoApi(),
		};
	}

	componentWillMount() {
		this.loadCurrencies();
	}

	async loadCurrencies() {
		const currencies = await this.state.gecko.getCurrencies()
		this.setState({...this.state, currencies: currencies});
	} 

	updateFromState(currency, value) {
		this.setState({
			...this.state,
			fromCurrency: currency,
			fromValue: value,
		});
	}

	updateToState(currency, value) {
		this.setState({
			...this.state,
			toCurrency: currency,
			toValue: value
		});
	}

	convert() {
		const prices = Object.fromEntries(this.state.currencies?.data.map(c => [c.id, c.price]));
		
		const newToValue = prices[this.state.fromCurrency] * this.state.fromValue / prices[this.state.toCurrency];
		this.setState({...this.state, toValue: newToValue});
	}

    render() {
		
    	return (
			<div>
				<ConverterField 
					currencies={ this.state.currencies?.data ? this.state.currencies.data.map(c => c.id) : [] }
					currency={ this.state.fromCurrency }
					value={ this.state.fromValue }
					onChange={ (currency, value) => this.updateFromState(currency, value) }
				/>

				<ConverterField 
					currencies={ this.state.currencies?.data ? this.state.currencies.data.map(c => c.id) : [] }
					currency={ this.state.toCurrency }
					value={ this.state.toValue }
					onChange={ (currency, value) => this.updateToState(currency, value) }
				/>

				<ConverterButton onClick={ () => this.convert() } />
			</div>
    	);
	}
}

export { Converter };