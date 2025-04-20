import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../assets/url'

const Profile = () => {
  const[data,setData] = useState({
    email: "",
    username:"",
    phone:"",
    fullname:""
  })
  const {token,setToken} =  useContext(storeContext)
  const navigate = useNavigate()

  const getUserData = async () =>{
    try {

      const res = await axios.get(`${url}user/get`, {headers:{token : localStorage.getItem('token')}})
      console.log(res.data.data);
      
      if(res.data.success){
        setData({
          email: res.data.data.email,
          username: res.data.data.username,
          phone: res.data.data.phone,
          fullname: res.data.data.fullname
        })
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const logoutHandler =  () =>{
    try {
      localStorage.removeItem('token')
      setToken('')
      navigate('/login')
      window.location.reload()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getUserData()
  
    
  },[])
  return (
    <div>
      
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
      
      <h2 className="text-xl font-semibold mt-4">{data.fullname}</h2>
      <p className="text-gray-500">{data.username}</p>
      <p className="text-gray-500">{data.phone}</p>
      <p className="text-gray-500">{data.email}</p>


      <button
      
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300"
        onClick={logoutHandler}
      >
        Logout
      </button>
      </div>
    </div>
  )
}

export default Profile