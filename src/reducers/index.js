import {combineReducers} from 'redux';
import authState from './auth.reducer';
import postState from './post.reducer';

export default combineReducers({
  authState,
  postState,
});
