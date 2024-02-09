import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';

const Container = styled.div`
.chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
.user-details{
    /* display: flex;
    align-items: center; */
}
.avatar{
    img{
        height: 3 rem;
    }
}
`

const handleMsg = (msg) => {
    alert("msg is sent")
  }


function ChatContainer({user}) {

  return (
    <Container>
        <div className='chat-header'>
            <div className='user-details'>
                <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${user.avtarImage}`} alt="" />
                </div>
                <h3>{user.username}</h3>
            </div>
            <Logout/>
        </div>
        <Messages/>              
        <ChatInput handleMsg={handleMsg} />
    </Container>
  )
}

export default ChatContainer