import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import axios from 'axios'
import { allUsersRoute } from '../Routes/apiRoutes'
import Contacts from './Contacts'
import Welcome from './Welcome'
import ChatContainer from './ChatContainer'

const Container =  styled.div`
background-color:blueviolet;
width: 100vw;
height: 100vh;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
.container{
  background-color:red;
  height: 85vh;
  width: 85vw;
  display: grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width: 720px) and (max-width:1080px){
    grid-template-columns:35% 65%;
  }
  @media screen and (min-width: 360px) and (max-width:480px){
    grid-template-columns:15% 85%;
  }
}
.chat{
  display: flex;
  align-items: center;
  justify-content: center;
}
`
function Chat() {
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

  useEffect(() => {
    (async function fetchData() {
        if (currentUser && currentUser._id) {
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
         setAllUsers(data) 
        }
    })();
  }, [currentUser]);

  const handleChatChange = (user) => {
    setCurrentChat(user)
    console.log("chat is chaning");
  }
  return (
    <Container>
     
        {allUsers && allUsers.length > 0 ?
          <div className='container'>  
            <Contacts allUsers={allUsers} currentUser={currentUser} chatChange={handleChatChange} />
          {
            currentChat ? 
            <ChatContainer user={currentChat}/>
            : <Welcome currentUser={currentUser}/> 
          }
          </div>
        :<div>Loding</div>  }
       
    </Container>
  )
}

export default Chat