import {Container, Fab, Icon, Text} from 'native-base';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {showAllPost} from '../actions/posts';
import PostCard from './PostCard';

function Home({navigation, showAllPost, postState}) {
  useEffect(() => {
    showAllPost();
  }, []);

  return (
    <Container>
      {postState.map((post, idx) => (
        <PostCard idx={idx} post={post} />
      ))}
      <PostCard />
      <Fab onPress={() => navigation.push('addpost')}>
        <Icon name="post-add" type="MaterialIcons" />
      </Fab>
    </Container>
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
