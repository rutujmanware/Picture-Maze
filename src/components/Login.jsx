import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { useGoogleLogin } from "@react-oauth/google";


import {client} from '../client';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(user);
          setProfile(res.data);
          console.log(res.data);
          localStorage.setItem('user',JSON.stringify(res.data));
          const {name, id, picture} = res.data;
          const doc ={
            _id : id,
            _type : 'user',
            userName : name,
            image : picture,
          }

          client.createIfNotExists(doc).then(()=>{
            navigate("/",{replace:true})
          })
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
