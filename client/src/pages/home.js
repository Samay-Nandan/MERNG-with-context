import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/postCard';
import PostForm from '../components/postForm';
import { GET_POSTS_QUERY } from '../graphql/index';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS_QUERY);

  const showPosts = data?.getPosts.map(post => {
    return <Transition.Group key={post.id}>
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          </Transition.Group>
  });


  return(
    <div>
      <Grid stackable 
            columns={3} 
            className="content-container">
        <Grid.Row className="page-title">
          <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
          { 
            user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            ) 
          }
          {
            loading ?  <h1> loading... </h1> : showPosts
          }
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;