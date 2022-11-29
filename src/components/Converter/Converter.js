import React from 'react';
import { ConverterField } from './ConverterField';

import CoinGeckoApi from '../../modules/CoinGeckoApi';

import './css/Converter.css';

class Converter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fromCurrency: {},
			fromValue: null,
			toCurrency: {},
			toValue: null,
			gecko: new CoinGeckoApi(),
		};
	}

	componentDidMount() {
		this.loadCurrencies();
	}

	componentDidUpdate(nextProps, nextState) {
		if(
			nextState.fromCurrency !== this.state.fromCurrency ||
			nextState.toCurrency !== this.state.toCurrency ||
			nextState.fromValue !== this.state.fromValue
		 ) {
			this.convert();
		 }
	}

	loadCurrencies() {
		this.state.gecko.getCurrencies().then(data => {
			this.setState({
				...this.state, 
				currencies: data.currencies, 
				fromCurrency: data.currencies.find(c => c.symbol === 'BTC'),
				toCurrency: data.currencies.find(c => c.symbol === 'USDC'),
				lastUpdate: data.lastUpdate
			});
		});
	} 

	updateFromState(value) {
		this.setState({
			...this.state,
			fromValue: value,
		});
	}

	selectFromCurrency(currency) {
		this.setState({...this.state, fromCurrency: currency});
	}

	selectToCurrency(currency) {
		this.setState({...this.state, toCurrency: currency});
	}

	convert() {
		const prices = Object.fromEntries(this.state.currencies.map(c => [c.id, c.price]));

		const flatPrice = price => {
			const priceLengh = parseInt(price).toString().length;
			return price.toFixed(6-priceLengh >= 0 ? 6-priceLengh : 0);
		} 
		
		const newToValue = prices[this.state.fromCurrency.id] * this.state.fromValue / prices[this.state.toCurrency.id];
		this.setState({...this.state, toValue: flatPrice(newToValue)});
	}

    render() {
		
    	return (
			<div className="Converter">
				<h1 className='title'>SwapGecko</h1>

				<ConverterField 
					currencies={ this.state.currencies  ?? [] }
					currency={ this.state.fromCurrency }
					value={ this.state.fromValue }
					lastUpdate= { this.state.lastUpdate }
					onChange={ value => this.updateFromState(value) }
					onSelect={ currency => this.selectFromCurrency(currency) }
				/>

				<ConverterField 
					currencies={ this.state.currencies  ?? [] }
					currency={ this.state.toCurrency }
					lastUpdate= { this.state.lastUpdate }
					value={ this.state.toValue }
					onSelect={ currency => this.selectToCurrency(currency) }
				/>

			</div>
    	);
	}
}

export { Converter };