import { gql } from 'apollo-server'

const qraphQLTypeDefination = gql` 
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User{
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    likes: [CommentLike]!
    likeCount: Int!
  }
  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }
  type CommentLike{
    id: ID!
    createdAt: String!
    username: String!
  }
  type Query{
    getPosts: [Post]
    getPost( postId: ID! ): Post
  }
  type Mutation{
    register( username: String!,
              password: String!,
              confirmPassword: String!,
              email: String! ): User!
    login( username: String!, password: String! ): User!
    createPost( body: String! ): Post!
    deletePost( postId: ID! ): String!
    likePost( postId: ID! ): Post!
    createComment( postId: ID!, body: String! ): Post!
    deleteComment( postId: ID!, commentId: ID! ): Post!
    likeComment( postId: ID!, commentId: ID! ): Post!
  }
`
export default qraphQLTypeDefination;