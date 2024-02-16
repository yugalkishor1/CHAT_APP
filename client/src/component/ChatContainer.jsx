import React, { useEffect, useState,useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from "axios"
import {sendMessage} from "../Routes/apiRoutes.js"
import { getAllMessage } from '../Routes/apiRoutes.js'
import {v4 as uuidv4} from "uuid"

function ChatContainer({user,currentUser,socket}) {

    const [allMessages,setAllMessages] = useState([]);
    const [arrivalMessages,setArrivalMessages] = useState(null);
    const scrollRef = useRef()

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

            socket.current.emit("send-msg",{
                to:user._id,
                from:currentUser._id,
                msg:msg
            })

            const msgs = [...allMessages]
            msgs.push({fromSelf:true,message:msg})
            setAllMessages(msgs)
            
        } catch (error) {
            console.log(error.message);
        }
      }

    useEffect(()=>{
        socket.current.on("recive-msg",(msg)=>{
            setArrivalMessages({fromSelf:false,message:msg})
        })
    },[])

    useEffect(()=>{
        arrivalMessages && setAllMessages((perv)=>[...perv,arrivalMessages])
    },[arrivalMessages]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[allMessages])
    

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
                        <div ref={scrollRef}
                        key={uuidv4()} 
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

const Container = styled.div`
    display: flex;
    height: 100%;
    overflow: auto;
    flex-direction: column;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        /* height: 10%; */
    }

    .avatar{
        img{
            height: 3 rem;
        }
    }
    .chat-message{
        height: 90%;
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

export default ChatContainer