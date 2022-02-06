import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useMutation } from '@apollo/client';
import { Button, Label, Icon, Popup } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from "../graphql/index";

const LikeButton = ( props ) => {

  const { user, post } = props

  const [liked, setLiked] = useState(false);

  useEffect(()=> {

    if (user && post.likes.find(like => like.username === user.username)) return setLiked(true);
    
    setLiked(false);

  }, [user, post.likes]);

  const [ likePost ] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: post.id }
  })

  const likeButton = user ? (
                              <Button color='red' basic={ liked ? false : true }> 
                                <Icon name='heart' />
                              </Button>
                            ) : (
                              <Button as={ Link } to="/login" color='red' basic >
                                <Icon name='heart' />
                              </Button>
                            )

  return (
          <Button as='div' 
                  labelPosition='right' 
                  onClick={ likePost }>
            <Popup content={liked ? "Unlike" : "Like"}
                  size="mini" 
                  trigger={ likeButton }
            />
            <Label basic 
                  color='red' 
                  pointing='left'>
              { post.likeCount }
            </Label>
          </Button>
  );
}

export default LikeButton;