import {Body, Text, Header, Right} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';

function CustomHeader({navigation, logout, authState}) {
  return (
    <Header androidStatusBarColor="#3f51b5" style={{backgroundColor: '#fff'}}>
      <Body>
        <Text>Social App</Text>
      </Body>
      <Right>
        {authState.isAuth ? (
          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        ) : null}
      </Right>
    </Header>
  );
}
const mapStateToProps = (state) => {
  return {
    authState: state.authState,
  };
};

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
