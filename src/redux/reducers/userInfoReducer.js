import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userInfo;
