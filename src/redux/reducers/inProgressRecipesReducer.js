import { IN_PROGRESS_DRINKS, IN_PROGRESS_MEALS } from '../actions';

const INITIAL_STATE = {
  drinks: {},
  meals: {},
};

const inProgressRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IN_PROGRESS_MEALS:
    return { ...state, meals: { ...state.meals, [action.id]: action.ingredients } };
  case IN_PROGRESS_DRINKS:
    return { ...state, drinks: { ...state.drinks, [action.id]: action.ingredients } };
  default:
    return state;
  }
};

export default inProgressRecipes;

// {
//     drinks: {
//         id-da-bebida: [lista-de-ingredientes-utilizados],
//         ...
//     },
//     meals: {
//         id-da-comida: [lista-de-ingredientes-utilizados],
//         ...
//     }
// }
