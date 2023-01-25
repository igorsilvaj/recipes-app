import { combineReducers } from 'redux';
import doneRecipes from './doneRecipesReducer';
import userInfo from './userInfoReducer';
import favoriteRecipes from './favoriteRecipesReducer';
import inProgressRecipes from './inProgressRecipesReducer';

const rootReducer = combineReducers({
  doneRecipes,
  userInfo,
  favoriteRecipes,
  inProgressRecipes,
});

export default rootReducer;
