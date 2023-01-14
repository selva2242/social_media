import React from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Image,  Icon, Label } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';



export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
        body,
        createdAt,
        id,
        comments {
          id,
        },
        likesCount,
        commentsCount
      }
  }
`;


const PostCard = ({post}) => (
      
      <Card size="massive" >
        <Card.Content  as={Link} to={`/post/${post.id}`}>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{post.body}</Card.Header>
          <Card.Meta>{moment(post.createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
             <strong>{post.body}</strong>
          </Card.Description>
        </Card.Content>
        <Button as='div' labelPosition='right' size="">
            <Button color='blue'>
                <Icon name='heart' />
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
                {post.likesCount}
            </Label>
            <Button color='blue'>
                <Icon name='comments' />
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
                {post.commentsCount}
            </Label>
        </Button>
      </Card>
  )
  
const Home = () => {

    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);

    return(
        <div>
            {
                loading ?
                <h3> Loading ......</h3> :
                <>
                    <Card.Group>
                         
                    {

                    data.getPosts.map((post)=>{
                        return <PostCard key = {post.id} post={post}></PostCard>
                    })
}
                    </Card.Group>
               
                </>

            }    
            "Home is here"
        </div>
    )
   
}

export default Home;