import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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
                <div className='upper-div'>
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
                </div>

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

    const Container = styled.div`
    background-color:#6d6666;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .upper-div{
        height: 85%;
        overflow: auto;
    }

    .contacts{
        display: flex;
        flex-direction:row;
        align-items: center;
        background-color: white;
        padding: 1rem;
        margin: 1rem;
        box-sizing: border-box;
    }

    .currentuser{
        background-color:orange;
        padding: 2rem;
        height: 15%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;

        
    img{
        max-width:100%;
        /* max-height:100%;3 */
    }
    h1{
        color: black;
        text-transform:uppercase;
        max-width:100%;
        max-height:100%;
    }
    }
    .select{
        background-color: blue;
    }
    .avatar{
        height: 50px;
        width: 50px;
    }
    `;


export default Contacts