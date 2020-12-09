import {
  Button,
  Container,
  Form,
  Input,
  Item,
  Row,
  Spinner,
  Text,
  View,
  Fab,
  Icon,
} from 'native-base';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {IS_AUTHNTICATED} from '../actions/actions.types';
import {singUp} from '../actions/auth';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';

function Signup({navigation, authState, singUp}) {
  const dispatch = useDispatch();

  const handleSingUp = async () => {
    const data = {
      userName,
      password,
      phoneNumber,
      emailAddress,
    };
    singUp(data, navigation);
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  if (authState.singUpLoader) {
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
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </Item>
      <Item>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </Item>
      <Item>
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </Item>
      <Item>
        <Input
          placeholder="Email Address"
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
        />
      </Item>
      <Button
        style={{alignSelf: 'center', marginVertical: 20}}
        onPress={handleSingUp}>
        <Text>Submit</Text>
      </Button>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text> Have an account already? </Text>
        <TouchableOpacity onPress={() => navigation.push('signin')}>
          <Text>Login</Text>
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
  singUp: (data, navigation) => singUp(data, navigation),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
