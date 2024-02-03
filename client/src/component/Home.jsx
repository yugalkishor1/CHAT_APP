import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>

    <div  className=' w-full h-full bg-black text-white'>Home
        <div className=' w-full h-full bg-black text-white'>
          <h1 className='bg-red-700 text-green'>hello</h1>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        </div>
    </div>

    </div>
    
  )
}

export default Home