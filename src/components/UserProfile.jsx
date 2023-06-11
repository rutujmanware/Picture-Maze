import React,{useState, useEffect} from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import {useParams , useNavigate} from 'react-router-dom';
import {GoogleLogout} from '@react-oauth/google';
 import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const UserProfile = () => {

const [user, setUser] = useState(null);
const [pins, setPins] = useState(null);
const [text, setText] = useState('Created');
const [activeBtn, setActiveBtn] = useState('created');
const navigate = useNavigate();
const {userId} = useParams();

useEffect(() => {
const query = userQuery(userId);
client.fetch(query)
.then((data) => {
  setUser(data[0]);
})
}, [userId])

if(!user){
  return (<Spinner message="Loading Profile"/>)
}

const logout = () => {
  localStorage.clear();
  navigate('/login');
}

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex felx-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} 
            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            alt='banner-pic'/>
            <img className='w-20 h-20 rounded-full -mt-10 shadow-xl randomImage'
            src={user.image}
            alt='user'
            />
            <h1
            className='font-bold text-3xl text-center mt-3'
            >
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0  p-2 '>
            {userId === user._id && (
              <div>
                <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => logout()}
            >
              <AiOutlineLogout className="mr-4" />
              Logout
            </button>
              </div>
            )}
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default UserProfile
