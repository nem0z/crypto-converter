import React from 'react';

class ConverterListCurrencies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: this.props.currencies,
		};
	}

    updateListCurrencies(inputValue) {
        const filteredCurrencies = this.state.currencies?.filter(c => c.includes(inputValue));
        this.setState({currencies: filteredCurrencies});
    }

    render() {

    	return (
			<div>
                { console.log(this.state) }
                <input type="text" onChange={ e => this.updateListCurrencies(e.target.value) } />
                <ul>
                    { this.state.currencies?.map(c => 
                        <li key={c}>{ c }</li>
                    ) }
                </ul>

            </div>
    	);
	}
}

export { ConverterListCurrencies };