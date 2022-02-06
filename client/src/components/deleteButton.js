import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import { GET_POSTS_QUERY, DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from '../graphql/index';

const DeleteButton = ( props ) => {

  const { postId, commentId, callback } = props

  const navigate = useNavigate();
  const [ confirmOpen, setConfirmOpen ] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [ deletePostOrComment ] = useMutation(mutation, {
    update: (proxy) => { 
      setConfirmOpen(false);

      if (!commentId) { 
        const data = proxy.readQuery({ query: GET_POSTS_QUERY });
        if(!data) return navigate('/')
        const temp = data.getPosts.filter(post => post.id !== postId);
        proxy.writeQuery({ query: GET_POSTS_QUERY, data: { getPosts: temp } });
      } 

      if (callback) callback();
    },
    variables: { postId, commentId }
  });

  return (
          <>
            <Popup content={ commentId ? 'Delete comment' : 'Delete post' }
                  size="mini" 
                  trigger={
                              <Button basic 
                                      color="grey" 
                                      floated="right" 
                                      onClick={()=> setConfirmOpen(true)}
                              >
                                <Icon name="trash" />
                              </Button>
                  }
            />
            <Confirm open={confirmOpen} 
                    onCancel={()=> setConfirmOpen(false)} 
                    onConfirm={deletePostOrComment}
            />
          </>
  );
}




export default DeleteButton;