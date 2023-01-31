import { SAVE_RECIPES, SAVE_CATEGORIES, SAVE_DETAILS } from '../actions';

const INITIAL_STATE = {
  data: null,
  categories: null,
  recommendations: null,
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
  case SAVE_DETAILS:
    return {
      ...state,
      recommendations: action.recipes,
    };
  default:
    return state;
  }
};

export default apiResponse;

