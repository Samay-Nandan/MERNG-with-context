import gql from 'graphql-tag';

export const GET_SINGLE_POST = gql `
  query($postId: ID!) {
    getPost(postId: $postId) {
      id 
      username 
      body 
      createdAt
      likes { 
         username 
      }
      likeCount
      comments {
        id 
        username 
        body 
        createdAt 
        likes { 
          username 
        }
      }
      commentCount
    }
  }
`;

