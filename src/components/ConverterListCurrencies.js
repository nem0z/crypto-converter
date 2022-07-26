import React from 'react';

class ConverterListCurrencies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
        }
    }

    updateListCurrencies(inputValue) {
        const filteredCurrencies = this.props.currencies.filter(c => c.includes(inputValue));
        this.setState({currencies: filteredCurrencies});
    }

    render() {

    	return (
			<div>
                { console.log(this.props) }
                <input type="text" onChange={ e => this.updateListCurrencies(e.target.value) } />
                <ul>
                    { (this.state.currencies ?? this.props.currencies).map(c => 
                        <li key={c}>{ c }</li>
                    ) }
                </ul>

            </div>
    	);
	}
}

export { ConverterListCurrencies };