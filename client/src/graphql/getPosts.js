import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
{
  getPosts {
    id 
    username 
    createdAt 
    body 
    likeCount 
    likes {
        username
    }
    commentCount
    comments {
      id 
      username 
      createdAt 
      body 
      likeCount 
      likes { 
        username 
      } 
    }
  }
}
`;