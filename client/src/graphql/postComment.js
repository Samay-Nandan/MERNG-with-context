import gql from 'graphql-tag';

export const POST_COMMENT = gql`
  mutation ($postId: ID!, $body: String!){
    createComment(postId: $postId, body: $body){
      id
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