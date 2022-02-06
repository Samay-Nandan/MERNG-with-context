import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './likeButton';
import DeleteButton from './deleteButton';

const PostCard = ( props ) => {

  const { id, username, body, createdAt, likeCount, commentCount, likes } = props.post;
  const { user } = useContext(AuthContext);

  return(
    <Card fluid>
      <Card.Content>
        <Image floated='right'
               size='mini'
               src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header> { username } </Card.Header>
        <Card.Meta as={Link} 
                   to={`/post/${id}`}> 
                   { moment(createdAt).fromNow() }
        </Card.Meta>
        <Card.Description> { body } </Card.Description>
      </Card.Content>
      <Card.Content extra >
        <LikeButton post={{ id, likes, likeCount }} 
                    user={user} 
        />
        <Popup content="Comment"
               size="mini" 
               inverted 
               position='top center'
               trigger={
                  <Button labelPosition='right' 
                          as={Link} 
                          to={`/post/${id}`}>
                    <Button color='teal' 
                            basic>
                      <Icon name='comments' />
                    </Button>
                    <Label basic 
                           color='teal' 
                           pointing='left'>
                      { commentCount }
                    </Label>
                  </Button>
               }
        />
        {
           user && user.username === username && <DeleteButton postId={id}/>
        }
      </Card.Content>
    </Card>
  );
}

export default PostCard;