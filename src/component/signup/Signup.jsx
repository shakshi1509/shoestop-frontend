import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const url = "https://shoestop-backend-mri7.onrender.com/signup"

    const submitHandler = async () => {

        if (!name || !email || !password) {
            alert("Please fill all the fields")
            return
        }

        try {
            setLoading(true)

            const res = await axios.post(url, {
                name,
                email,
                password
            })

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                alert("Registration successful!")
                navigate('/')
                window.location.reload()
            }

        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Signup failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signup'>

            <input
                type="text"
                placeholder='username'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder='email'
                value={email}
                onChange={(e) => setMail(e.target.value)}
            />

            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={submitHandler} disabled={loading}>
                {loading ? "Signing Up..." : "SignUp"}
            </button>

        </div>
    )
}

export default Signup