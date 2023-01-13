import React from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Image } from 'semantic-ui-react'

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
      
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{post.body}</Card.Header>
          <Card.Meta>{post.createdAt}</Card.Meta>
          <Card.Description>
             <strong>{post.body}</strong>
          </Card.Description>
        </Card.Content>
        {/* <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content> */}
      </Card>
  )
  
const Home = () => {

    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);
          console.log("yehova")

    // console.log(data.getPosts)      
    return(
        <div>
            {
                loading ?
                <h3> Loading ......</h3> :
                <>
                    <Card.Group>
                         
                    {

                    data.getPosts.map((post)=>{
                        return <PostCard post={post}></PostCard>
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