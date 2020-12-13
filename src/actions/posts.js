import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';
import {SET_ALL_POST, POST_UPLOADING} from './actions.types';

export const addPost = (data, navigation) => async (dispatch) => {
  dispatch({
    type: POST_UPLOADING,
    payload: true,
  });
  const {emailAddress, image, caption, uid} = data;
  database()
    .ref(`/posts/${data.uid}`)
    .set({
      emailAddress,
      image,
      caption,
    })
    .then(() => {
      Snackbar.show({
        text: 'Post Succesfully Added',
        backgroundColor: 'green',
      });
      dispatch({
        type: POST_UPLOADING,
        payload: false,
      });
      navigation.push('home');
    })
    .catch((err) => {
      dispatch({
        type: POST_UPLOADING,
        payload: false,
      });
      Snackbar.show({
        text: 'Failed to Upload Post',
        backgroundColor: 'red',
      });
    });
};

export const showAllPost = (data, navigation) => async (dispatch) => {
  database()
    .ref('/posts')
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: SET_ALL_POST,
          payload: Object.values(snapshot.val()),
        });
      }
    });
};
