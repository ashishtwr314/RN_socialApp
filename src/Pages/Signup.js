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
import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {IS_AUTHNTICATED} from '../actions/actions.types';
import {singUp} from '../actions/auth';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {enableScreens} from 'react-native-screens';

function Signup({navigation, authState, singUp}) {
  const dispatch = useDispatch();

  const firstRender = useRef(true);

  const [userName, setUserName] = useState('');
  const [userNameErr, setUserNameErr] = useState('');
  const [userNameTouched, setUserNameTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);

  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressErr, setEmailAddressErr] = useState('');
  const [emailAddressTouched, setEmailAddressTouched] = useState(false);

  const setTextChange = (name, value) => {
    if (name == 'userName') {
      setUserName(value);
      if (!userNameTouched) {
        setUserNameTouched(true);
      }
    }

    if (name == 'password') {
      setPassword(value);
      if (!passwordTouched) {
        setPasswordTouched(true);
      }
    }

    if (name == 'emailAddress') {
      setEmailAddress(value);
      if (!emailAddressTouched) {
        setEmailAddressTouched(true);
      }
    }

    if (name == 'phoneNumber') {
      setPhoneNumber(value);
      if (!phoneNumberTouched) {
        setPhoneNumberTouched(true);
      }
    }
  };

  const handleSingUp = async () => {
    const data = {
      userName,
      password,
      phoneNumber,
      emailAddress,
    };

    if (
      !userNameErr.length ||
      !phoneNumberErr.length ||
      !emailAddressErr.length ||
      !passwordErr.length
    ) {
      singUp(data, navigation);
    }
  };

  useEffect(() => {
    console.log(firstRender.current);
    if (firstRender.current) {
      firstRender.current = false; // it's no longer the first render
      return; // skip the code below
    }

    if (userName.indexOf(' ') !== -1 && userNameTouched) {
      setUserNameErr("Shouldn't contain Spaces");
    } else {
      setUserNameErr('');
    }

    if (password.length <= 6 && passwordTouched) {
      setPasswordErr('Password must be 6+ characetrs long');
    } else {
      setPasswordErr('');
    }

    if (
      (phoneNumber.length < 10 || phoneNumber.length > 10) &&
      phoneNumberTouched
    ) {
      setPhoneNumberErr('Phone number must be excat 10 characters');
    } else {
      setPhoneNumberErr('');
    }

    var re = new RegExp(/\S+@\S+\.\S+/);
    if (!re.test(emailAddress) && emailAddressTouched) {
      setEmailAddressErr('Enter a Valid Email address');
    } else {
      setEmailAddressErr('');
    }

    // if (
    //   !data.userName ||
    //   !data.password ||
    //   !data.phoneNumber ||
    //   !data.emailAddress
    // ) {
    //   return Snackbar.show({
    //     text: 'All feilds are required',
    //     backgroundColor: 'red',
    //   });
    // }

    // if (data.userName.indexOf(' ') !== -1) {
    //   setUserNameErr("Shouldn't contain Spaces");
    // } else {
    //   setUserNameErr('');
    // }

    // if (data.password.length <= 6) {
    //   setPasswordErr('Password must be 6+ characetrs long');
    // } else {
    //   setPasswordErr('');
    // }

    // if (data.phoneNumber.length < 10 || data.phoneNumber.length > 10) {
    //   setPhoneNumberErr('Phone number must be excat 10 characters');
    // } else {
    //   setPhoneNumberErr('');
    // }

    // var re = new RegExp(/\S+@\S+\.\S+/);
    // if (!re.test(data.emailAddress)) {
    //   setEmailAddressErr('Enter a Valid Email address');
    // } else {
    //   setEmailAddressErr('');
    // }
  }, [userName, password, phoneNumber, emailAddress]);

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
          onChangeText={(text) => setTextChange('userName', text)}
        />
      </Item>
      {userNameErr ? <ErrorTextView errorText={userNameErr} /> : null}

      <Item>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setTextChange('password', text)}
        />
      </Item>
      {passwordErr ? <ErrorTextView errorText={passwordErr} /> : null}
      <Item>
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={(text) => setTextChange('phoneNumber', text)}
        />
      </Item>
      {phoneNumberErr ? <ErrorTextView errorText={phoneNumberErr} /> : null}
      <Item>
        <Input
          placeholder="Email Address"
          value={emailAddress}
          onChangeText={(text) => setTextChange('emailAddress', text)}
        />
      </Item>
      {emailAddressErr ? <ErrorTextView errorText={emailAddressErr} /> : null}
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

function ErrorTextView({errorText}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
      <Icon style={{fontSize: 20}} name="error-outline" type="MaterialIcons" />
      <Text
        style={{
          marginHorizontal: 5,
          marginVertical: 10,
          color: 'red',
          fontSize: 13,
        }}>
        {errorText}
      </Text>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
