/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';

const PokemonDetails = () => {
  const {id} = useParams()

  const [image, setImage] = useState('')
  const [weight, setWeight] = useState('')
  const [listTypes, setListTypes] = useState([])
  const [type, setType] = useState([])
  const [name, setName] = useState('')
  const [listMoves, setListMoves] = useState([])
  const [moves, setMoves] = useState([])
  const [description, setDescription] = useState('')

  const fetchDetails = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(res => {
        setName(res.name)
        setImage(res.sprites.front_default)
        setWeight(res.weight)
        setListTypes(res.types)
        setListMoves(res.moves)
      })
      .catch(err => console.log(err))

    const res = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}`)
    const data = await res.json()
    const descriptionEs = await data.descriptions.find(descrip => descrip.language.name === "es")
    setDescription(descriptionEs.description)

    listMoves.map(async move => {
      const res = await fetch(move.move.url)
      const data = await res.json()
      const dataEs = await data.names.find(move => move.language.name === "es")
      setMoves(mov => [...mov, dataEs])
    })

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
    fetchDetails()
  }, [description])

  return (
    <>
      <Button color="black" ><Link to="/">Atras</Link></Button>
      <Card fluid>
        <Header as='h1' block textAlign="center">
          {name}
        </Header>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={image} size="medium" centered />
            </Grid.Column>
            <Grid.Column width={13}>
                <Header as="h3">Descripcion: {description}</Header>
                <Header as="h3">Peso: {weight} Kg</Header>
                <Header as="h3">Tipo: {type.map((typ, index) => <li key={index}>{typ.name}</li>)}</Header>
                <Header as="h3">Movimientos: {moves.map((move, index) => <li key={index}>{move.name}</li>)}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Card>
    </>
  )
}

export default PokemonDetails;