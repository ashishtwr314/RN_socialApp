import {
  Button,
  Container,
  Form,
  Input,
  Item,
  Spinner,
  Text,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {signIn} from '../actions/auth';

function SignIn({navigation, signIn, authState}) {
  const handleSingIn = () => {
    if (emailAddress && password) {
      const data = {
        emailAddress,
        password,
      };

      signIn(data, navigation);
    } else {
      Snackbar.show({
        text: 'Please Provide a email and password',
        backgroundColor: 'red',
      });
    }
  };

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  if (authState.signInLoader) {
    return (
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Spinner color="blue" />
      </Container>
    );
  }

  return (
    <Form>
      <Item>
        <Input
          placeholder="Email Password"
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
        />
      </Item>
      <Item>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </Item>

      <Button
        style={{alignSelf: 'center', marginVertical: 20}}
        onPress={handleSingIn}>
        <Text>Submit</Text>
      </Button>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text> Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.push('signup')}>
          <Text>Singup</Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
  };
};
const mapDispatchToProps = {
  signIn: (data, navigation) => signIn(data, navigation),
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
