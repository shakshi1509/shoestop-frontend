import React from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Home from './component/home/Home'
import Fav from './component/fav/Fav'
import Navbar from './component/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cart from './component/cart/Cart'
import Signup from './component/signup/Signup'
import Login from './component/login/Login'
import NavbarLog from './component/navbar/NavbarLog'

const App = () => {

  const hasToken = !!localStorage.getItem('token')

  return (
    <HashRouter>
      <div>
        {hasToken ? (
          <NavbarLog />
        ) : (
          <Navbar />
        )}

        <Routes>
          {hasToken ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}

          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fav" element={<Fav />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App