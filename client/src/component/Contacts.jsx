import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { getUserBySearch } from '../Routes/apiRoutes'

function Contacts({allUsers,currentUser, chatChange}) {

    const [currentUserImage,setCurrentUserImage] = useState()
    const [currentUserName,setCurrentUserName] = useState()
    const [currentSelected,setCurrentSelected] = useState()
    const [currentChat, setCurrentChat] = useState()
    const [search,setSearch] = useState("")
    const [querySearch,setQuerySearch] = useState([])

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

   useEffect(()=>{
            (async()=>{
                try {
                    const {data} = await axios.post(`${getUserBySearch}/${currentUser.username}`,{input:search});
                    console.log("R",data.data);
                    setQuerySearch(data.data)
                } catch (error) {
                    console.log(error.message);
                }
            }
           )();
   },[search])

   
    return (
        <>
        { 
            (currentUserImage && currentUserName ? 
                <Container>
                    <div className='search-bar'>
                        <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search....'/>
                    </div>
                    
                    {
                        querySearch.length > 0  ?
                        
                        <div className='upper-div'>
                        {querySearch.map((user,index)=>{
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

                        :  
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
                    }
                   

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
    .upper-div::-webkit-scrollbar{
        display: none;
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
    .search-bar{
        padding: 10px;
        display: flex;
        justify-content: center;
        border: none;
        input{
            padding: 15px;
            width: 90%;
            border-radius: 99px;
            border: none;
            font-size: 20px;
        }
    }
    `;


export default Contacts