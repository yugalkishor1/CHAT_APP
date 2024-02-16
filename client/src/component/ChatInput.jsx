import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import styled from "styled-components"
import {FaPaperPlane} from "react-icons/fa"
import { BsEmojiSmileFill } from "react-icons/bs";


function ChatInput({handleMsg}) {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const handleEmojiHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event,emoji) => {


      let message = msg;
      
      message = message + event.emoji;
      setMsg(message)
  }

  const sendChat = (e) =>{
      e.preventDefault();
      if(msg.length>0){
        handleMsg(msg)
        setMsg("")
      }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          {/* <BsEmojiSmileFill onClick={handleEmojiHideShow}/> */}
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>

      <form className='input-container' onSubmit={(e)=>{sendChat(e)}}>
        <input className="inputs" type="text" placeholder='type your message here'
        value={msg} 
        onChange={(e)=>{setMsg(e.target.value)}}
        />
        <button className='submit'><FaPaperPlane/></button>
      </form>
    </Container>
  )
}



const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
 
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: absolute;
      
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        position: absolute;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
     height: 4rem; 
    background-color: #ffffff34;
    position: relative; 
    input {
      width: 90%;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;



export default ChatInput