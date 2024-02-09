import React from 'react'
import styled from 'styled-components'
import {FiLogOut} from "react-icons/fi"
import {useNavigate} from "react-router-dom"

const Button = styled.button`
background-color:blue;
padding: 2 rem;
color:white;
border-radius:20px;
display: flex;
align-items: center;
justify-content: center;

`;

function Logout() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("chat-app-user")
        navigate("/login")
    } 

  return (
    <Button 
    onClick={handleLogOut}
    >
        Logout<FiLogOut/>
    </Button>
  )
}

export default Logout