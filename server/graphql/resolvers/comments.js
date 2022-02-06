import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/post.js';
import Authentication from '../../utils/authentication.js';

const commentsResolver = {
  Mutation: {
    createComment: async (_, args, context) =>{
      const { postId, body } = args
      const { username } = Authentication(context); 
      if ( !body ){
        const errors = {
          body: 'Comment must not be empty'
        }
        throw new UserInputError('Empty comment', { errors });
      }

      const post = await Post.findById(postId);

      if(!post) throw new UserInputError('Post not found');

      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString()
      });
      await post.save();
      return post

    },
    deleteComment: async(_, args, context) => {
      const { postId, commentId } = args
      const { username } = Authentication(context); 
      const post = await Post.findById(postId);

      if( !post ) throw new UserInputError('Post not found');

      const commentIndex = await post.comments.findIndex(comment => comment.id === commentId);

      if( post.comments[commentIndex].username !== username ) throw new AuthenticationError('Action not allowed');
      
      post.comments.splice(commentIndex, 1);
      await post.save();
      return post;

    },
    likeComment: async(_, args, context) => {
      const { postId, commentId } = args
      const { username } = Authentication(context); 

      const post = await Post.findById(postId);

      if( !post ) throw new UserInputError('Post not found');

      const commentIndex = await post.comments.findIndex(comment => comment.id === commentId);

      if( commentIndex < -1 ) throw new UserInputError('Comment not found');

      if ( post.comments[commentIndex].likes.find(like => like.username === username) ){
        post.comments[commentIndex].likes =  post.comments[commentIndex].likes.filter(like => like.username !== username);
      } else {
        post.comments[commentIndex].likes.push({ username, createdAt: new Date().toISOString() });
      }
      await post.save();
      return post;

    }
  }
}

export default commentsResolver;