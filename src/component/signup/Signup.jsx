```jsx
import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async () => {
        if (!name || !email || !password) {
            alert('Please fill all fields')
            return
        }

        try {
            const url = 'https://shoestop-backend-mri7.onrender.com/signup'

            const res = await axios.post(url, {
                name,
                email,
                password
            })

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                alert('Registration successful!')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <div className="signup">
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={submitHandler}>
                SignUp
            </button>
        </div>
    )
}

export default Signup
