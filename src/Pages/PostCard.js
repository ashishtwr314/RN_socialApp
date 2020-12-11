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
} from 'native-base';
import {Image} from 'react-native';
import React from 'react';

function PostCard({post, idx}) {
  return (
    <Container>
      {console.log(post)}
      <Card>
        <CardItem cardBody>
          {post ? (
            <Image
              source={{
                uri: post.img,
              }}
              style={{width: 100, height: 100}}
            />
          ) : (
            <Text>NO IMAGE </Text>
          )}
        </CardItem>
      </Card>
    </Container>
  );
}

export default PostCard;
