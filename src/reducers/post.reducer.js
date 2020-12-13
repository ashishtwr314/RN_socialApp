import {POST_UPLOADING, SET_ALL_POST} from '../actions/actions.types';

const initialState = {
  postUploading: false,
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POST:
      if (action.payload) {
        return {...initialState, posts: [...action.payload]};
      }

    case POST_UPLOADING:
      console.log('POST UPLOAIING:', action.payload);
      return {...state, postUploading: action.payload};

    default:
      return state;
  }
};
