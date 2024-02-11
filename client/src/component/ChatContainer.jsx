import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from "axios"
import {sendMessage} from "../Routes/apiRoutes.js"
import { getAllMessage } from '../Routes/apiRoutes.js'

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
.chat-message{
    height: 70vh;
    background-color:white;
    overflow: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
.message{
    display: flex;
    align-items: center;
    padding: 1rem;
}
.content{
    /* max-width: 40%; */
    /* overflow-wrap:break-word; */
    padding:1rem;
    border-radius:1rem;
    background-color:red;
}
.you{
    justify-content: flex-end;
}}
`

function ChatContainer({user,currentUser}) {

    const [allMessages,setAllMessages] = useState([]);

    const fetchMsg = async() =>{
        try {
            const response = await axios.post(getAllMessage,{from:currentUser._id,to:user._id})

            setAllMessages(response.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
       fetchMsg();
    },[user])

    const handleMsg = async(msg) => {
        try {
            const {data} = await axios.post(sendMessage,{message:msg,from:currentUser._id,to:user._id})
            console.log(data);
            
        } catch (error) {
            console.log(error.message);
        }
      }
    

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
        <div className='chat-message'>
            {
                allMessages.map((msg,index)=>{
                    return(
                        <div 
                        key={index} 
                        className={`message ${msg.fromSelf ? "you" : "other"}`}
                        >
                            <div>
                                <p className='content'> 
                                    {msg.message}
                                </p>
                            </div>

                        </div>
                    )
                })
            }
        </div>             
        <ChatInput handleMsg={handleMsg} />
    </Container>
  )
}

export default ChatContainer