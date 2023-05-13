import React from "react";
import { Pokemon } from "../pokemon/Pokemon";
export const PokemonDetails = () => {
  const [pokemon, setPokemon] = React.useState(null);
  console.log(pokemon);
  const [id, setId] = React.useState(0);

  const getPokemonById = (id) => {
    if (id < 1 || id > 151) {
      alert("Pokemon ID must be between 1 and 151");
      return;
    }
    fetch(`https://jsonmock.hackerrank.com/api/pokemon?id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setPokemon(response.data);
      });
  };

  const getNextEvolution = () => {
    getPokemonById(pokemon.next_evolution[0].num);
  };
  const getPrevEvolution = () => {
    getPokemonById(pokemon.prev_evolution[pokemon.prev_evolution.length - 1].num);
  };
  const onChange = (e) => {
    setId(e.target.value);
  };
  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <Pokemon pokemon={pokemon} />
      <p>
        {pokemon && (
          <button onClick={() => getPrevEvolution()} data-testid="pokemon-prev" disabled={!("prev_evolution" in pokemon)}>
            Previous Evolution
          </button>
        )}
        {pokemon && (
          <button onClick={() => getNextEvolution()} data-testid="pokemon-next" disabled={!("next_evolution" in pokemon)}>
            Next Evolution
          </button>
        )}
      </p>
      <p>
        <input data-testid="id-input" value={id} onChange={onChange} type="number" placeholder="Pokemon Id"></input>
        <button data-testid="random-pokemon" onClick={() => getPokemonById(id)} className="text">
          Get Pokemon
        </button>
      </p>
    </div>
  );
};
