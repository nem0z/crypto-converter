// react
import { useEffect, useState } from 'react'

// components
import Converter from './components/Converter/Converter'

// cass
import './App.css'
import { currency } from './components/Converter/types';
import CoinGeckoApi from './components/Converter/modules/CoinGeckoAPI';

function App() {
	const clientAPI = new CoinGeckoApi();
	const [currencies, setCurrencies] = useState<currency[]>([]);

	useEffect(() => {		
		clientAPI.get()
			.then(setCurrencies);
	}, []);

	return (
		<div className='App'>
			{ currencies.length > 0 &&
				<Converter currencies={ currencies } />
			}
		</div>
	)
}

export default App;