
import React, { useState, useEffect } from 'react'
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

    const [hasToken, setHasToken] = useState(
        !!localStorage.getItem('token')
    )

    useEffect(() => {
        const checkToken = () => {
            setHasToken(!!localStorage.getItem('token'))
        }

        window.addEventListener('storage', checkToken)

        return () => {
            window.removeEventListener('storage', checkToken)
        }
    }, [])

    return (
        <HashRouter>
            <div>
                {hasToken ? <NavbarLog /> : <Navbar />}

                <Routes>
                    <Route
                        path="/"
                        element={hasToken ? <Home /> : <Login />}
                    />

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
