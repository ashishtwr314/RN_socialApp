import {
  IS_AUTHNTICATED,
  SET_SINGUP_LOADER,
  SET_USER,
  SIGNUP_DONE,
} from '../actions/actions.types';

const initialState = {
  isAuth: false,
  user: null,
  signUp: false,
  singUpLoader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHNTICATED:
      return {
        ...state,
        isAuth: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SIGNUP_DONE:
      return {
        ...state,
        signUp: action.payload,
      };

    case SET_SINGUP_LOADER:
      return {
        ...state,
        singUpLoader: action.payload,
      };

    default:
      return state;
  }
};
