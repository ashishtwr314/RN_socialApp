import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
} from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

function PostCard({post, idx}) {
  return (
    <View key={idx} style={{marginVertical: 10}}>
      <TouchableOpacity>
        <Card>
          <CardItem>
            <View>
              <Image
                source={{
                  uri: 'https://static.thenounproject.com/png/363640-200.png',
                }}
                style={{
                  width: 40,
                  height: 40,

                  borderWidth: 2,
                  borderRadius: 75,
                }}
              />
            </View>
            <Text style={{marginLeft: 10}}>{post.emailAddress}</Text>
          </CardItem>
          <CardItem cardBody>
            {post !== undefined ? (
              <>
                <Image
                  source={{
                    uri: post.image,
                  }}
                  style={{width: '100%', height: 200}}
                />
              </>
            ) : null}
          </CardItem>
          <CardItem>
            <Left style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="hearto" type="AntDesign" />
              <Text style={{marginLeft: 10}}>{post.caption}</Text>
            </Left>
            <Right>
              <Text style={{marginLeft: 'auto'}}>12 Dec 2020</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default PostCard;
