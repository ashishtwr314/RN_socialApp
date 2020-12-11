import {SET_ALL_POST} from '../actions/actions.types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POST:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
