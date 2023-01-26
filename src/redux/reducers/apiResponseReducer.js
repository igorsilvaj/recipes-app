import { SAVE_RECIPES, SAVE_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  data: null,
  categories: null,
};

const apiResponse = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_RECIPES:
    return {
      ...state,
      data: action.recipes,
    };
  case SAVE_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
    };
  default:
    return state;
  }
};

export default apiResponse;
