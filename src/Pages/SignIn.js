import {Button, Form, Input, Item, Text, View} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {signIn} from '../actions/auth';

function SignIn({navigation, signIn}) {
  const handleSingIn = () => {
    const data = {
      emailAddress,
      password,
    };

    signIn(data, navigation);
  };

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

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

const mapDispatchToProps = {
  signIn: (data, navigation) => signIn(data, navigation),
};

export default connect(null, mapDispatchToProps)(SignIn);
