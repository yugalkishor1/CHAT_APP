import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setavatarRoute } from '../Routes/apiRoutes';

function Setavatar() {
  const api = "https://api.multiavatar.com/456789";
  const navigate = useNavigate();
  const [avatars, setAavatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
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
      setIsLoading(false);
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
    <>
      <div className='bg-blue-300 min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl'>
          Pick an Avatar as your Profile picture
        </h1>
        <div className='flex flex-row mt-4'>
          {avatars.map((avatar, index) => {
            return (
              <div className={`rounded-full w-20 h-20 border ${selectedAvatar === index ? " border-4 border-red-700" : "border-gray-400"} rounded-md p-1 bg-black-700`}
                key={index}
                onClick={() => { setSelectedAvatar(index) }}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            );
          })}
        </div>
        <button className='border rounded border-blue text-white bg-red-600 p-2 hover:bg-red-800 cursor-pointer mt-4' onClick={setProfilePicture}>
          Set as Profile picture
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Setavatar;
