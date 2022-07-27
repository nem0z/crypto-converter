import React from 'react';
import { ConverterButton } from './ConverterButton';
import { ConverterField } from './ConverterField';

import CoinGeckoApi from '../../modules/CoinGeckoApi';

class Converter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fromCurrency: {},
			fromValue: 0.0,
			toCurrency: {},
			toValue: 0.0,
			gecko: new CoinGeckoApi(),
		};
	}

	componentWillMount() {
		this.loadCurrencies();
	}

	loadCurrencies() {
		this.state.gecko.getCurrencies().then(currencies => {
			this.setState({
				...this.state, 
				currencies: currencies, 
				fromCurrency: currencies.find(c => c.symbol === 'BTC'),
				toCurrency: currencies.find(c => c.symbol === 'USDT'),
			});
		});
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

	selectFromCurrency(currency) {
		console.log(this.state);
		this.setState({...this.state, fromCurrency: currency});
	}

	selectToCurrency(currency) {
		console.log(this.state);
		this.setState({...this.state, toCurrency: currency});
	}

	convert() {
		const prices = Object.fromEntries(this.state.currencies.map(c => [c.id, c.price]));
		
		const newToValue = prices[this.state.fromCurrency] * this.state.fromValue / prices[this.state.toCurrency];
		this.setState({...this.state, toValue: newToValue});
	}

    render() {
		
    	return (
			<div>
				<ConverterField 
					currencies={ this.state.currencies  ?? [] }
					currency={ this.state.fromCurrency }
					value={ this.state.fromValue }
					onChange={ (currency, value) => this.updateFromState(currency, value) }
					onSelect={ currency => this.selectFromCurrency(currency) }
				/>

				<ConverterField 
					currencies={ this.state.currencies  ?? [] }
					currency={ this.state.toCurrency }
					value={ this.state.toValue }
					onChange={ (currency, value) => this.updateToState(currency, value) }
					onSelect={ currency => this.selectToCurrency(currency) }
				/>

				<ConverterButton onClick={ () => this.convert() } />

			</div>
    	);
	}
}

export { Converter };