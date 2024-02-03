import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../Routes/apiRoutes'
import Chat from "../component/Chat"

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
    <div className=' min-h-screen bg-blue-300 flex justify-center items-center '>
      <form onSubmit={(e)=>{handleSubmit(e)}} className='m-4 p-2 border-2 border-gray-500 rounded flex flex-col'>
        <input type="text" value={username} placeholder='username' onChange={(e)=>setUsername(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
        <input type="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded'/>
        <input type='submit' className='border rounded broder-white text-white bg-red-500 p-2 hover:bg-red-700 cursor-pointer' />
      <p>Don't have account?<span className='hover:underline'><Link to="/register">Register</Link></span></p>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login