import {SET_ALL_POST} from '../actions/actions.types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POST:
      console.log('ACTIONPAYLOAD', action.payload);
      if (action.payload) {
        return [...initialState, ...action.payload];
      }

    default:
      return state;
  }
};
