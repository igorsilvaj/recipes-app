import { SUCESS_REQUEST } from '../actions';

const INITIAL_STATE = {
  data: null,
};

const apiResponse = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_REQUEST:
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export default apiResponse;
