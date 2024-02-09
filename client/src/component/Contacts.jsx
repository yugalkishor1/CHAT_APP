import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
background-color:green;
height: 85vh;

img{
    height: 2rem;
}
h1{
    color: black;
    text-transform:uppercase;
}
.contacts{
    display: flex;
    flex-direction:column;
    overflow: auto;
    width: 85%;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    overflow: auto;
    box-sizing: border-box;
}
.currentuser{
    background-color:orange;
    padding: 2rem;
}
.select{
    background-color: blue;
}
`;

function Contacts({allUsers,currentUser, chatChange}) {

    const [currentUserImage,setCurrentUserImage] = useState()
    const [currentUserName,setCurrentUserName] = useState()
    const [currentSelected,setCurrentSelected] = useState()
    const [currentChat, setCurrentChat] = useState(undefined)

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avtarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])

    const changeCurrentChat = (index, user) => {
        setCurrentSelected(index);
        chatChange(user)
    }
   

  return (
    <>
    { 
        (currentUserImage && currentUserName ? 
            <Container>
                {allUsers.map((user,index)=>{
                    return (
                    <div 
                        className={`contacts ${index==currentSelected ? "select": ""}`}
                        key={index}
                        onClick={()=>{changeCurrentChat(index,user)}}
                        >
                        <div 
                        className='avatar'
                        key={index}>
                            <img src={`data:image/svg+xml;base64,${user.avtarImage}`} alt="avatar" />
                        </div>
                        <h1>
                            {user.username}
                        </h1>

                    </div>
                    )
                    
                })}

                <div className='currentuser'>
                    <img 
                    src={`data:image/svg+xml;base64,${currentUser.avtarImage}`} alt="avatar" 
                    className='avatar'
                    />
                    <h1>{currentUser.username}</h1>
                </div>
            </Container> : <div>Loding...</div>)
    }
    </>
  )
}

export default Contacts