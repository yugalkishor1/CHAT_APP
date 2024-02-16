import React from 'react'
import styled from "styled-components"
import{Link} from "react-router-dom"

function Home() {
    return (
        <Container>
            <div className='outer-div'>
                <h2 className='title'>Welcome to the app</h2>
                <div>
                <Link to="/register">Regsiter</Link>
                Or
                <Link to="/login">Login</Link>
                </div>
            </div>
           
            
        </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color:#6d6666;
    
    .outer-div{
    display: flex;
    align-items: center;
    justify-content: center;
    height:75vh;
    width:40vw; 
    background-color: #d7c9c9;
    flex-direction: column;
    }

    .title{
        color: #cd1d1d;
    }
    
    `;

export default Home