import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../assets/url'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../context/StoreContext'

const Login = () => {

  const navigate = useNavigate()
 const {token,setToken} =  useContext(storeContext)

  const [isLoggedIn, setIsLoggedIn] = useState('SignIn')
  const [data, setdata] = useState({
    email: "",
    password: "",
    username:"",
    phone:"",
    fullname:""
  })

  const handlesubmit = async (e) =>{
    e.preventDefault()

    if(isLoggedIn == 'SignIn'){
      try {
        const response = await axios.post(`${url}user/login`, data)
        console.log(response.data);
        if(response.data.success){
          localStorage.setItem('token', response.data.data.token)
          setToken(response.data.data.token)
          navigate('/')
          window.location.reload()
        }
        setdata({
          email: "",
          password: "",
          username:"",
          phone:"",
          fullname:""
        })
      
      } catch (error) {
        console.log(error);
        
      }
    }
    else if(isLoggedIn == 'SignUp'){
      try {
        const response = await axios.post(`${url}user/register`, data)
        console.log(response.data);
        if(response.data.success){
          setIsLoggedIn('SignIn')
        }
        window.location.reload()
        setdata({
          email: "",
          password: "",
          username:"",
          phone:"",
          fullname:""
        })

        
      } catch (error) {
        console.log(error);
        setdata({
          email: "",
          password: "",
          username:"",
          phone:"",
          fullname:""
        })
        
      }
    }
    setdata({
      email: "",
      password: "",
      username:"",
      phone:"",
      fullname:""
    })

    window.location.reload()
   



    

  }

  const onchangehandler = (e) =>{
    const {name, value} = e.target
    setdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(()=>{
    console.log(data);
    
  },[data])


  return (
    <div>
        <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
             
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{isLoggedIn} to your account</h2>
            
            </div>

            <div className="mt-8">
              <div>
                <div>
                
                </div>

             
              </div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={handlesubmit}>
                  
              {isLoggedIn == 'SignUp' &&  <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                    Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={data.fullname}
                        required
                        onChange={(event)=> onchangehandler(event)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>}
                 { isLoggedIn == 'SignUp' && <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                       value={data.username}
                        required
                        onChange={(event)=> onchangehandler(event)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>}
                 { isLoggedIn == 'SignUp' && <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="number"
                       value={data.phone}
                        required
                        onChange={(event)=> onchangehandler(event)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>  
                  </div> }
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        autoComplete="email"
                        required
                        onChange={(event)=> onchangehandler(event)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        required
                        onChange={(event)=> onchangehandler(event)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button onClick={()=>isLoggedIn == 'SignIn'? setIsLoggedIn('SignUp' ): setIsLoggedIn('SignIn')} className="font-medium text-indigo-600 hover:text-indigo-500" >
                        click here to {isLoggedIn == 'SignIn' ? 'SignUp' : 'SignIn'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                     {isLoggedIn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Login