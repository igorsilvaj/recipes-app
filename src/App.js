import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route component={ Login } path="/" exact />
      <Route component={ Recipes } path="/meals" exact />
      <Route component={ Recipes } path="/drinks" exact />
      <Route component={ RecipeDetails } path="/meals/:id" exact />
      <Route component={ RecipeDetails } path="/drinks/:id" exact />
      <Route component={ RecipeInProgress } path="/meals/:id/in-progress" exact />
      <Route component={ RecipeInProgress } path="/drinks/:id/in-progress" exact />
      <Route component={ Profile } path="/profile" />
      <Route component={ DoneRecipes } path="/done-recipes" />
      <Route component={ FavoriteRecipes } path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
