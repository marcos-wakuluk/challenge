import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path='/' exact>
            <PokemonList />
          </Route>
          <Route path='/poke/:id'>
            <PokemonDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
