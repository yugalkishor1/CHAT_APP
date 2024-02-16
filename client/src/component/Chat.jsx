import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import axios from 'axios'
import { allUsersRoute } from '../Routes/apiRoutes'
import Contacts from './Contacts'
import Welcome from './Welcome'
import ChatContainer from './ChatContainer'
import io from "socket.io-client"

function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [allUsers,setAllUsers] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
 

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    if(user && user.isAvataeImageset){
      setCurrentUser(user)
    }else{
      navigate("/setavatar")
    }
  },[])

  useEffect(()=>{
      // const socket = io("http://localhost:3000");
      // socket.on("connect",()=>{
      //   console.log(socket.id);   
      // });
      if(currentUser){
        socket.current = io("http://localhost:3000");
        // console.log(currentUser._id);
        socket.current.emit("add-user",currentUser._id)
      }

      

  },[currentUser])

  useEffect(() => {
    (async function fetchData() {
        if (currentUser && currentUser._id) {
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
         setAllUsers(data) 
        }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
     
        {allUsers && allUsers.length > 0 ?
          <div className='container'>  
            <Contacts allUsers={allUsers} currentUser={currentUser} chatChange={handleChatChange} />
          {
            currentChat ? 
            <ChatContainer user={currentChat} currentUser={currentUser} socket={socket}/>
            : <Welcome currentUser={currentUser}/> 
          }
          </div>
        :<div>Loding</div>  }
       
    </Container>
  )
}

const Container =  styled.div`

background-color:blueviolet;
width: 97vw;
height: 97vh;
display: flex;
overflow: hidden;
flex-direction:column;
justify-content: center;
align-items: center;
.container{
  background-color:red;
  height: 100%;
  width: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns:25% 75%;

}
.chat{
  display: flex;
  align-items: center;
  justify-content: center;
}
`
export default Chat