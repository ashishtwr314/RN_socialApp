import {Container, Fab, Icon, Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {showAllPost} from '../actions/posts';
import PostCard from './PostCard';

function Home({navigation, showAllPost, postState}) {
  useEffect(() => {
    showAllPost();
  }, []);

  return (
    <>
      <ScrollView>
        {console.log(postState)}
        <View style={{width: '80%', alignSelf: 'center'}}>
          {postState.posts ? (
            postState.posts.map((post, idx) => (
              <PostCard idx={idx} post={post} />
            ))
          ) : (
            <Container
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Spinner color="blue" />
            </Container>
          )}
        </View>
      </ScrollView>
      <Fab onPress={() => navigation.push('addpost')}>
        <Icon name="post-add" type="MaterialIcons" />
      </Fab>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    postState: state.postState,
  };
};

const mapDispatchToProps = {
  showAllPost: () => showAllPost(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
