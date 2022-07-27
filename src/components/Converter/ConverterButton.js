import React from 'react';

class ConverterButton extends React.Component {
    render() {
    	return (
			<button type="button" onClick={ () => this.props.onClick() }>Convert</button>
    	);
	}
}

export { ConverterButton };