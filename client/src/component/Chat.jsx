import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import axios from 'axios'
import { allUsersRoute } from '../Routes/apiRoutes'
import Contacts from './Contacts'

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
`
function Chat() {
  const navigate = useNavigate()
  const [allUsers,setAllUsers] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const user = JSON.parse(localStorage.getItem("chat-app-user"))

  useEffect(()=>{
    
    if(user && !user.isAvataeImageset){
      navigate("/setavatar")
    }else{
      setCurrentUser(user)
    }
  },[])

  useEffect(() => {
    (async function fetchData() {
        if (currentUser && currentUser._id) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setAllUsers(response.data);
        }
    })();
  }, [currentUser]);

  return (
    <Container>
      <div className='container'>
        <Contacts allUsers={allUsers} currentUser={currentUser} />
      </div>
    </Container>
  )
}

export default Chat