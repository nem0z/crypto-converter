import React from 'react';

class ConverterField extends React.Component {

    render() {

    	return (
			<div>
                <input type="text" list="currencies" value={this.props.currency} onChange={e => this.props.onChange(e.target.value, this.props.value)}/>

                <datalist id="currencies">
                    { this.props.currencies.map((c, k) =>
                        <option key={k} value={c} />
                    ) }
                </datalist>

                <input type="number" value={this.props.value} onChange={e => this.props.onChange(this.props.currency, e.target.value)}/>
            </div>
    	);
	}
}

export { ConverterField };