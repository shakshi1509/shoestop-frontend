import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert('Please fill in all fields')
            return
        }

        try {
            setLoading(true)

            const url = 'https://shoestop-backend-mri7.onrender.com/signup'

            const response = await axios.post(url, {
                name,
                email,
                password
            })

            if (response.status === 200 || response.status === 201) {
                alert('Registration successful!')

                if (response.data.token) {
                    localStorage.setItem(
                        'token',
                        JSON.stringify(response.data.token)
                    )
                }

                navigate('/login')
            }

        } catch (error) {
            console.error('Signup error:', error)

            alert(
                error.response?.data?.message ||
                'Registration failed. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signup">

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : 'SignUp'}
                </button>

            </form>

        </div>
    )
}

export default Signup