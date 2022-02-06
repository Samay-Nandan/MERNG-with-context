import { AuthenticationError, UserInputError } from 'apollo-server';
import Post from '../../models/post.js';
import Authentication from '../../utils/authentication.js';

const postsResolver = {
  Query: {
    async getPosts(){
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (err){
        throw new Error(err);
      }
    },
    async getPost(_, args){
      const { postId } = args
      try {
        const post = await Post.findById( postId );
        if( !post ) throw new Error('Post not found');
        return post;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, args, context) {
      const { body } = args;
      const user = Authentication(context);
      if ( !body ) throw new Error('Post must not be empty');

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      return await newPost.save();
    },
    async deletePost(_, args, context){
      const { postId } = args
      const user = Authentication(context);

      try{
        const post = await Post.findById(postId);
        if( user.username !== post.username ) throw new AuthenticationError('Action not allowed');

        await post.delete();
        return 'Post deleted successfully';
      } catch(err){
        throw new Error(err);
      }
    },
    async likePost(_, args, context) {
      const { postId } = args
      const { username } = Authentication(context);

      const post = await Post.findById(postId);

      if( !post ) throw new UserInputError('Post not found');

      if ( post.likes.find(like => like.username === username) ){
        post.likes = post.likes.filter(like => like.username !== username);
      } else {
        post.likes.push({
          username,
          createdAt: new Date().toISOString()
        });
      }
      await post.save();
      return post;

    }
  },
}

export default postsResolver;