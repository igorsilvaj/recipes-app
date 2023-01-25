import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Recipes } path="/meals" />
        <Route component={ Recipes } path="/drinks" />
        <Route component={ RecipeDetails } path="/meals/:id-da-receita" />
        <Route component={ RecipeDetails } path="/drinks/:id-da-receita" />
        <Route component={ RecipeInProgress } path="/meals/:id-da-receita/in-progress" />
        <Route component={ RecipeInProgress } path="/drinks/:id-da-receita/in-progress" />
        <Route component={ Profile } path="/profile" />
        <Route component={ DoneRecipes } path="/done-recipes" />
        <Route component={ FavoriteRecipes } path="/favorite-recipes" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
