import postsResolver from './posts.js';
import usersResolver from './users.js';
import commentsResolver from './comments.js';

const rootResolver = {
  Post:{ 
    likeCount: (parent) =>  parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Comment:{
    likeCount: (parent) => parent.likes.length
  },
  Query:{
    ...postsResolver.Query
  },
  Mutation:{
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation
  },
}

export default rootResolver;