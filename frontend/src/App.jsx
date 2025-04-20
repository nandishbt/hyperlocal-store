import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import StoreDetails from './pages/StoreDetails'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='min-h-screen bg-white w-full'>

      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/store/:id' element={<StoreDetails />} /> 
        <Route path='/placeorder' element={<PlaceOrder />} />
      </Routes>

      <Footer />


    </div>
  )
}

export default App