import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id 
      username 
      body 
      createdAt
      likes {
        id 
        username 
        createdAt
      }
      likeCount
      comments {
        id 
        body 
        username 
        createdAt 
        likes {
          id 
          username 
          createdAt
        }
      }
      commentCount
    }
  }

`