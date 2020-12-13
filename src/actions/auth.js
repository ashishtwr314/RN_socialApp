import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';
import {
  IS_AUTHNTICATED,
  SET_SINGIN_LOADER,
  SET_SINGUP_LOADER,
  SET_USER,
  SIGNUP_DONE,
} from './actions.types';

export const singUp = (data, navigation) => async (dispatch) => {
  const {username, phoneNumber, password, emailAddress} = data;

  dispatch({
    type: SET_SINGUP_LOADER,
    payload: true,
  });

  auth()
    .createUserWithEmailAndPassword(emailAddress, password)

    .then((user) => {
      database()
        .ref(`/users/${user.user.uid}`)
        .set({
          username,
          phoneNumber,
          emailAddress,
        })
        .then(() => {
          Snackbar.show({
            backgroundColor: 'green',
            text: 'Successfully Singed Up',
          });
          dispatch({
            type: SIGNUP_DONE,
            payload: true,
          });
          dispatch({
            type: SET_SINGUP_LOADER,
            payload: false,
          });

          navigation.push('signin');
        })
        .catch((err) => {
          dispatch({
            type: SET_SINGUP_LOADER,
            payload: false,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: SET_SINGUP_LOADER,
        payload: false,
      });
      Snackbar.show({
        text: err.toString(),
      });
    });
};

export const signIn = (data, navigation) => async (dispatch) => {
  dispatch({
    type: SET_SINGIN_LOADER,
    payload: true,
  });
  const {emailAddress, password} = data;

  auth()
    .signInWithEmailAndPassword(emailAddress, password)
    .then((user) => {
      console.log(user);
      if (user) {
        dispatch({
          type: IS_AUTHNTICATED,
          payload: true,
        });
        dispatch({
          type: SET_USER,
          payload: user,
        });
        dispatch({
          type: SET_SINGIN_LOADER,
          payload: false,
        });
        navigation.push('home');
      } else {
        dispatch({
          type: IS_AUTHNTICATED,
          payload: false,
        });
        dispatch({
          type: SET_SINGIN_LOADER,
          payload: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      Snackbar.show({
        text: err.toString(),
        backgroundColor: '#000000',
        textColor: '#fff',
      });
      dispatch({
        type: IS_AUTHNTICATED,
        payload: false,
      });
      dispatch({
        type: SET_SINGIN_LOADER,
        payload: false,
      });
    });
};

export const logout = (data, navigation) => async (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      dispatch({
        type: IS_AUTHNTICATED,
        payload: false,
      });
    });
};
