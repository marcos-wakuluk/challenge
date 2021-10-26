import React, { useState, useEffect } from 'react';
import { Button, Card, Dimmer, Loader } from 'semantic-ui-react';
import PokemonCard from './PokemonCard';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=20'

const PokemonList = () => {
  const [listPokemon, setlistPokemon] = useState([])
  const [prevPokemons, setPrevPokemons] = useState('')
  const [nextPokemons, setNextPokemons] = useState('')
  const [busy, setBusy] = useState(true)

  const fetchListPokemon = async (url) => {
    await fetch(url)
    .then(res => res.json())
    .then(res => {
        setPrevPokemons(res.previous)
        setNextPokemons(res.next)
        setlistPokemon(res.results)
        setBusy(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchListPokemon(url)
  }, [])

  const fetchPrevListPokemon = (prevPokemons) => {
    setlistPokemon([])
    setBusy(true)
    fetchListPokemon(prevPokemons)
  }

  const fetchNextListPokemon = (nextPokemons) => {
    setlistPokemon([])
    setBusy(true)
    fetchListPokemon(nextPokemons)
  }

  return(
    <div>
      <div style={{ display: "inline-block", width: "100%" }}>
        <Button color="black" floated='left' disabled={prevPokemons === null} onClick={() => fetchPrevListPokemon(prevPokemons)}>Anterior</Button>
        <Button color="black" floated='right' disabled={nextPokemons === null} onClick={() => fetchNextListPokemon(nextPokemons)}>Siguiente</Button>
      </div>
      <div className="inlineFlex">
        {busy ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <Card.Group itemsPerRow={5}>
            {listPokemon.map((poke, index) =>
              <PokemonCard pokemon={poke} key={index}/>
            )}
          </Card.Group>
        )}
      </div>
    </div>
  )
}

export default PokemonList;