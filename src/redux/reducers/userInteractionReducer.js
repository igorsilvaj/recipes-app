import { FILTER_CATEGORY } from '../actions';

const INITIAL_STATE = {
  filterCategory: '',
};

const userInteraction = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTER_CATEGORY:
    return {
      ...state,
      filterCategory: state.filterCategory === action.category
        ? ''
        : action.category,
    };
  default:
    return state;
  }
};

export default userInteraction;
