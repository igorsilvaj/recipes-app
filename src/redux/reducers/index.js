import { combineReducers } from 'redux';
import doneRecipes from './doneRecipesReducer';
import userInfo from './userInfoReducer';
import favoriteRecipes from './favoriteRecipesReducer';
import inProgressRecipes from './inProgressRecipesReducer';
import apiResponse from './apiResponseReducer';
import userInteraction from './userInteractionReducer';

const rootReducer = combineReducers({
  doneRecipes,
  userInfo,
  favoriteRecipes,
  inProgressRecipes,
  apiResponse,
  userInteraction,
});

export default rootReducer;
