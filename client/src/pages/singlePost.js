import { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Card, Form, Grid, Image, Icon, Label } from 'semantic-ui-react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/likeButton';
import DeleteButton from '../components/deleteButton';
import { GET_SINGLE_POST, POST_COMMENT } from "../graphql/index";

const SinglePost = () => {
  
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const navigate = useNavigate();

  const [ comment, setComment ] = useState('');

  const { data } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId
    }
  });

  const [ submitComment ] = useMutation(POST_COMMENT, {
    update: () => setComment(''),
    variables: {
      postId,
      body: comment
    }
  })

  if (!data) return <p> Loading post...</p>

  const { id, username, body, createdAt, likes, likeCount, comments, commentCount } = data.getPost;

  return (
      <Grid className="content-container">
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" 
                   size="small" 
                   float="right" 
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header> { username } </Card.Header>
                <Card.Meta> { moment(createdAt).fromNow() } </Card.Meta>
                <Card.Description> { body } </Card.Description>
              </Card.Content>
              <hr/>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes}} />
                {
                  user ? (
                  <Button as="div" labelPosition="right">
                    <Button basic color="teal">
                      <Icon name="comments"/>
                    </Button>
                    <Label basic 
                           color="teal" 
                           pointing="left"> 
                    { commentCount } 
                    </Label>
                  </Button>
                  ) : (
                    <Button as={Link} 
                            to="/login" 
                            labelPosition="right"
                    >
                      <Button basic color="teal">
                        <Icon name="comments"/>
                      </Button>
                      <Label basic 
                            color="teal" 
                            pointing="left"> 
                      { commentCount } 
                      </Label>
                    </Button>
                  )
                }
                {
                  user && user.username === username && <DeleteButton postId={id} callback={ () => navigate('/') } />
                }
              </Card.Content>
            </Card>
            {
              user && (
                <Card fluid>
                  <Card.Content>
                    <p> Reply Post </p>
                    <Form>
                      <div className="ui action input field">
                        <input type="text" 
                               placeholder="Comment..." 
                               name="comment" 
                               value={ comment } 
                               onChange={event => setComment(event.target.value)}
                        />
                        <button type="submit" 
                                className="ui button teal" 
                                disabled={ !comment } 
                                onClick={submitComment}
                        > Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )
            }
            {
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {
                      user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id}/>
                    }
                    <Card.Header> { comment.username } </Card.Header>
                    <Card.Meta> { moment(comment.createdAt).fromNow() } </Card.Meta>
                    <Card.Description> { comment.body } </Card.Description>
                  </Card.Content>
                </Card>
              ))
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

export default SinglePost;