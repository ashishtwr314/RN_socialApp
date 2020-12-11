import {Button, Container, Form, Text, Item, View, Textarea} from 'native-base';
import {Image} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {addPost} from '../actions/posts';
import {connect} from 'react-redux';
import shortid from 'shortid';

// More info on all the options is below in the API Reference... just some common use cases shown here

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
function AddPost({navigation, authState, addPost}) {
  const [postImage, setPostImage] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postImageName, setPostImageName] = useState('');
  const [postImagePath, setPostImagePath] = useState('');

  const pickAImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        await setPostImage(source);
        await setPostImageName(response.fileName);
        await setPostImagePath(response.path);
      }
    });
  };

  const uploadImage = () => {
    if (postImage) {
      const reference = storage().ref(postImageName);

      reference.putFile(postImagePath).then(async () => {
        const url = await reference.getDownloadURL();

        const data = {
          emailAddress: authState.user.user.email,
          image: url,
          caption: postCaption,
          uid: shortid.generate(),
        };

        console.log(data);
        addPost(data, navigation);
      });
    } else {
      console.log('EKLSEEE');
    }
  };

  return (
    <Container>
      <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
        <Image
          style={{
            width: '80%',
            height: 200,
            alignSelf: 'center',
          }}
          source={postImage}
        />
        {postImage ? (
          <Textarea
            onChangeText={(text) => setPostCaption(text)}
            value={postCaption}
            style={{borderWidth: 1, borderColor: '#4384f3', marginVertical: 20}}
            placeholder="Write a caption"></Textarea>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          style={{borderWidth: 1, borderColor: '#000'}}
          onPress={() => pickAImage()}>
          <Text>Pick A Image</Text>
        </Button>

        {postImage ? (
          <Button
            onPress={uploadImage}
            style={{alignSelf: 'center', marginHorizontal: 10}}>
            <Text>Done</Text>
          </Button>
        ) : null}
      </View>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    authState: state.authState,
  };
};

const mapDispatchToProps = {
  addPost: (data, navigation) => addPost(data, navigation),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
