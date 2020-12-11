import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';
import {SET_ALL_POST} from './actions.types';

export const addPost = (data, navigation) => async (dispatch) => {
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
      navigation.push('home');
    })
    .catch((err) => {
      Snackbar.show({
        text: 'Failed to Upload Post',
        backgroundColor: 'red',
      });
    });
};

export const showAllPost = (data, navigation) => async (dispatch) => {
  database()
    .ref('/posts')
    .on('value', (snapshot) => {
      dispatch({
        type: SET_ALL_POST,
        payload: Object.values(snapshot.val()),
      });
    });
};
