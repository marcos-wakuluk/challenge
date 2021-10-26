/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Image } from 'semantic-ui-react';

const PokemonCard = ({pokemon}) => {
  const [image, setImage] = useState('')
  const [weight, setWeight] = useState('')
  const [listTypes, setListTypes] = useState([])
  const [type, setType] = useState([])
  const [id, setId] = useState('')

  const fetchPokemon = async (pokemon) => {
    await fetch(pokemon.url)
      .then(res => res.json())
      .then(res => {
        setImage(res.sprites.front_default)
        setWeight(res.weight)
        setListTypes(res.types)
        setId(res.id)
      })
      .catch(err => console.log(err))

      listTypes.map(async types => {
        await fetch(types.type.url)
          .then(res => res.json())
          .then(res => res.names)
          .then(res => res.find(type => type.language.name === "es"))
          .then(res => {
            setType(typ => [...typ, res])
          })
      })
  }

  useEffect(() => {
    fetchPokemon(pokemon)
  }, [id])

  return(
    <Card key={pokemon.name}>
      <Image src={image} size="medium" centered/>
      <Card.Content>
        <Card.Header>
        <Header as="h2"><Link to={`/poke/${id}`}>{pokemon.name}</Link></Header>
        </Card.Header>
        <Card.Description>
          <Header as="h4">Tipo: {type.map((typ, index) => <li key={index}>{typ.name}</li>)}</Header>
        </Card.Description>
        <Card.Description>
          <Header as="h4">Peso: {weight} Kg</Header>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default PokemonCard;