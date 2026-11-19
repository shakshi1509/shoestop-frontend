import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Login = () => {

    const navigate = useNavigate()
    const { setToken } = useContext(productContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            alert('Please enter email and password')
            return
        }

        try {
            setLoading(true)

            const url = 'https://shoestop-backend-mri7.onrender.com/login'

            const response = await axios.post(url, {
                email,
                password
            })

            if (response.status === 200 || response.status === 201) {

                const receivedToken = response.data.token

                if (!receivedToken) {
                    alert('Login successful, but token was not received')
                    return
                }

                localStorage.setItem('token', receivedToken)

                setToken(receivedToken)

                alert('Login successful!')

                navigate('/home')
            }

        } catch (error) {

            console.error('Login error:', error)

            alert(
                error.response?.data?.message ||
                'Login failed. Please check your email and password.'
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signup">

            <form onSubmit={submitHandler}>

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

                <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : 'Login'}
                </button>

            </form>

        </div>
    )
}

export default Login