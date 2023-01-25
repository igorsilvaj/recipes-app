import { FAVORITE_RECIPE } from '../actions';

const INITIAL_STATE = [];

const favoriteRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FAVORITE_RECIPE:
    return [...state, action.recipe];
  default:
    return state;
  }
};

export default favoriteRecipes;

// {
// id: id-da-receita,
// type: meal-ou-drink,
// nationality: nacionalidade-da-receita-ou-texto-vazio,
// category: categoria-da-receita-ou-texto-vazio,
// alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
// name: nome-da-receita,
// image: imagem-da-receita
// }
