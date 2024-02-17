import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setavatarRoute } from '../Routes/apiRoutes';
import styled from 'styled-components';

function Setavatar() {
  const api = "https://api.multiavatar.com/456789";
  const navigate = useNavigate();
  const [avatars, setAavatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }

    if(JSON.parse(localStorage.getItem("chat-app-user")).isAvataeImageset==true){
      navigate("/chat")
    }
  }, []);

  useEffect(() => {
    (async function () {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 10000)}`);
        const buffer = Buffer.from(image.data).toString("base64");
        data.push(buffer);
      }
      setAavatars(data);
      setIsLoading(true);
    })();
  }, []);

  const setProfilePicture = async () => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));

    try {
      if (selectedAvatar === undefined) {
        (function notify() {
          toast.error("please select an Avatar");
        })();
      } else {
        const response = await axios.post(
          `${setavatarRoute}/${user._id}`,
          { image: avatars[selectedAvatar] }
        );

        if (response.data.isSet) {
          localStorage.setItem("chat-app-user", JSON.stringify(response.data.userResponse));

          navigate("/chat");
        } else {
          console.log("something went wrong, Try again");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
        {isLoading? 
            <div>
            <h1>
            Pick an Avatar as your Profile picture
            </h1>
            <div className='avatars'>
            {avatars.map((avatar, index) => {
                return (
                <div className={`avatar ${selectedAvatar===index ? "selected" : ""}`}
                    key={index}
                    onClick={() => { setSelectedAvatar(index) }}
                >
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                </div>
                );
            })}
            </div>
            <button onClick={setProfilePicture} className='btn'>
            Set as Profile picture
            </button>
            </div>
            :<div>Loading....</div>}
        <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color:#6d6666;
    .avatars{
        display: flex;
        flex-direction: row;
        padding: 15px;
        margin: 10px;
    }
    .avatar{
        height: 50px;
        width: 50px;
        border-radius:999px;
        padding: 15px;
        margin: 10px;
    }
    .btn{
        padding: 10px;
        border-radius:10px;
        border: none;
    }
    .btn:hover{
        background-color:black;
        color: white;
    }
    .selected{
        border: 5px solid red;
    }
`;

export default Setavatar;