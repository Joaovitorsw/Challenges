import React from 'react';
import './App.css';
import 'h8k-components';

import { PokemonDetails } from './components/pokemon-details/PokemonDetails';

const title = "Pokemon Details";

const App = () => {
	return (
		<div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<PokemonDetails />
		</div>
	);
}

export default App;
