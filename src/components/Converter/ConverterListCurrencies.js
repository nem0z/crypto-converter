import React from 'react';
import './css/ConverterListCurrencies.css'

class ConverterListCurrencies extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            currencies: null,
        }
    }

    handleClickOutside(event) {
        if (this.ref.current && !this.ref.current.contains(event.target)) {
          this.props.onClose && this.props.onClose();
        }
      };
    
      componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
      }
    
      componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
      };

    updateListCurrencies(inputValue) {
        const lowerValue = inputValue.toLowerCase()
        const filteredCurrencies = 
            this.props.currencies
                .filter(c => 
                    c.name.toLowerCase().includes(lowerValue) || 
                    c.id.toLowerCase().includes(lowerValue) || 
                    c.symbol.toLowerCase().includes(lowerValue)
                );
        this.setState({currencies: filteredCurrencies});
    }

    render() {

    	return (
			<div className='listCurrencies' ref={this.ref}>
                <input 
                    autoFocus
                    type="text" 
                    onChange={ e => this.updateListCurrencies(e.target.value) }
                    className='listCurrenciesInput'
                    placeholder='Search by token or project name'
                 />

                <div className='hr'></div>

                <ul className='listCurrenciesUl'>
                    { (this.state.currencies ?? this.props.currencies).map(c => 
                        <li key={c.id} onClick={ e => this.props.onSelect(c) }>
                            <img src={c.image} alt={c.id}></img>
                            <div className='wrapper'>
                                <p>
                                    <span>{ c.symbol }</span>
                                    <span>{ c.name }</span>
                                </p>
                                <p>
                                    <span>#{ c.rank }</span>
                                    <span>{ c.price }$</span>
                                </p>
                            </div>
                        </li>
                    ) }
                </ul>

                <div className='hr'></div>
                <div className='lastUpdate'>Last price update : { new Date(this.props.lastUpdate).toLocaleString() }</div>

            </div>
    	);
	}
}

export { ConverterListCurrencies };