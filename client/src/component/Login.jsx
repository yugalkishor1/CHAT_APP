import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../Routes/apiRoutes'
import Chat from "../component/Chat"
import styled from 'styled-components'

function Login() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/chat")
    }
  },[])

  const handleValidation = () => {

    if(username==""){
      (function notify(){
        toast.error("username is required")
      })();
      return false
    }else if (password==""){
      (function notify(){
        toast.error("password is required")
      })();
      return false
    }
    return true
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()) {
      try {
        const {data} = await axios.post(loginRoute,{
          username,password
        });
        console.log(data);

        if(data.status){

          localStorage.setItem("chat-app-user",JSON.stringify(data.userResponse));
          (function notify(){
            toast.success(`${data.userResponse.username} successfully Registered`)
          })();
          
          navigate("/setavatar")
        }else{
          (function notify(){
            toast.error(`${data.message} `,{autoClose:3000})
          })()
        }
      } catch (error) {
        console.log(error);
      }
    }
 }
  

  return (
    <Container>
      <form onSubmit={(e)=>{handleSubmit(e)}} className='form' >
        <input 
        type="text" 
        value={username} 
        placeholder='username' 
        onChange={(e)=>setUsername(e.target.value)} 
        />

        <input 
        type="password" 
        value={password} 
        placeholder='password' 
        onChange={(e)=>setPassword(e.target.value)} 
        />

        <input type='submit' className="btn" style={{border:"none", borderRadius:"5px"}}  />

        <p>Don't have account?<span><Link to="/register">Register</Link></span></p>
      </form>
      <ToastContainer/>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color:#6d6666;

    .form{
    display: flex;
    align-items: center;
    justify-content: center;
    height:75vh;
    width:40vw; 
    background-color: #d7c9c9;
    flex-direction: column;
        input{
			padding:0.5rem;
			margin: 0.5rem;
            border: none;
            border-radius:5px;
		}
    }

    .btn:hover{
    background-color: black;
    color: white;
    border: none;
    }
`;

export default Login