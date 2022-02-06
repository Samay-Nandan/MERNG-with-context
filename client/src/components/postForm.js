import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks'
import { GET_POSTS_QUERY, CREATE_POST_MUTATION } from '../graphql/index';
import Errors from './errors';

const PostForm = () => {

  const { values, onChange, onSubmit } = useForm(() => createPost(), { body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update: (proxy, result) => {
      const oldPosts = proxy.readQuery({ query: GET_POSTS_QUERY });
      const data = {
        getPosts: [ result.data.createPost, ...oldPosts.getPosts ]
      }
      proxy.writeQuery({ query: GET_POSTS_QUERY, data })
      values.body = '';
    },
    variables: values
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2> New Post </h2>
        <Form.Field>
          <Form.Input placeholder="Write a message..."
                      name="body"
                      onChange={onChange}
                      value={values.body}
                      error={ error ? true : false }
          />
          <Button type="submit" color="teal"> Submit </Button>
        </Form.Field>
      </Form>
      {
        error && <Errors message={error.graphQLErrors[0].message} />
      }
    </>
  );
}



export default PostForm;