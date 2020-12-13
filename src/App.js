import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Text, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './Pages/Signup';
import {requestPermissions} from './utils/requestPermissions';
const Stack = createStackNavigator();
import {useDispatch, connect} from 'react-redux';
import {IS_AUTHNTICATED, SET_USER} from './actions/actions.types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import {TextInput} from 'react-native-gesture-handler';
import AddPost from './Pages/AddPost';
import CustomHeader from './Pages/CustomHeader';

function App({authState}) {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: (props) => <CustomHeader {...props} />}}
        initialRouteName={'home'}>
        {authState.isAuth ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="addpost" component={AddPost} />
          </>
        ) : (
          <>
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="signin" component={SignIn} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
