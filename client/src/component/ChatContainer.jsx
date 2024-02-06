import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: grid;
grid-template-rows: 10% 90% 10%;
height: 100%;
background-color:blue;
color: white;

> .user{
    background-color:green;
}
> .container{
    background-color: yellow;
}
> .current-user{
    background-color:red;
}
`;

function ChatContainer({user}) {
    console.log(user);
  return (
    <Container>
        <div className='user'>{user.username} hi</div>
        <div className='container'>h</div>
        <div className='current-user'>h</div>
    </Container>
  )
}

export default ChatContainer