import React, { useState,useEffect } from 'react'
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../Routes/apiRoutes'

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("")
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")


  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/chat")
    }
  },[])

  const handleValidation = () => {

    if(password !== confirmPassword){
      (function notify(){
        toast.error("password and confirm password should be same",{position:"bottom-right"})
      })();
      return false
    }else if (username.length<3){
      (function notify(){
        toast.error("username should be greater than 3 character",{position:"bottom-right"})
      })();
      return false
    }else if (password<3){
      (function notify(){
        toast.error("password should be atleast 8 character",{position:"bottom-right"})
      })();
      return false
    }else if (email===""){
      (function notify(){
        toast.error("emial is required",{position:"bottom-right"})
      })();
      return false
    }
    return true
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()) {
      try {
        const {data} = await axios.post(registerRoute,{
          username,email,password
        });

        if(data.status){
          localStorage.setItem("chat-app-user",JSON.stringify(data.userResponse));

          (function notify(){
            toast.success(`${data.userResponse.username} successfully Registered`)
          })();
          
          setName("")
          setEmail("")
          setPassword("")
          setUsername("")
          setConfirmPassword("")
          navigate("/")
        }else{
          (function notify(){
            toast.error(`${data.message} `,{autoClose:3000})
          })()
        }
      } catch (error) {
        console.log(error.message);
      }
    }
 }
  

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-300' >
        <div className='border-2 border-red-300 p-4 '>
        <form onSubmit={(e)=>{handleSubmit(e)}} className=' flex flex-col'>
          <input type="text" value={name} placeholder='name' onChange={(e)=>setName(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
          <input type="text" value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
          <input type="email" value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
          <input type="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
          <input type="password" value={confirmPassword} placeholder='confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
          <input type='submit'  className='border rounded broder-white text-white bg-red-500 p-2 hover:bg-red-700 cursor-pointer'/>
          <p>Alreadu have an Account?<span className='hover:underline'><Link to="/login">Login</Link></span></p>
        </form>
        <ToastContainer/>
      </div>
    </div>
  
  )
}

export default Register