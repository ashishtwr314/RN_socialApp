import {Container, Fab, Icon, Text} from 'native-base';
import React from 'react';

function Home({navigation}) {
  return (
    <Container>
      <Fab onPress={() => navigation.push('addpost')}>
        <Icon name="post-add" type="MaterialIcons" />
      </Fab>
    </Container>
  );
}

export default Home;
