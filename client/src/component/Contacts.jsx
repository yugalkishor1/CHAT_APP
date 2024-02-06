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
    /* display: flex;
    flex-direction:column; */

}
`;

function Contacts({allUsers,currentUser}) {

    const [currentUserImage,setCurrentUserImage] = useState()
    const [currentUserName,setCurrentUserName] = useState()
    const [currentSelected,setCurrentCurrentSelected] = useState()
    const [currentChat, setCurrentChat] = useState(undefined)

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avtarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])

    const handleChat = (chat) => {
        setCurrentChat(chat)
    }

  return (
    <>
    { 
        (currentUserImage && currentUserName ? 
            <Container>
                <div>


                </div>
                {allUsers.map((user,index)=>(
                    <div 
                    key={index}
                    className={`contacts ${index===currentSelected ? "selected" : ""}`}
                    >
                        <div>
                            <img 
                            src={`data:image/svg+xml;base64,${user.avtarImage}`} alt="avatar"
                            className='avatar'
                            />
                            <h1>
                                {user.username}
                            </h1>
                        </div>
                      
                    </div>
                ))}
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