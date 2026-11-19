```jsx
import React, { useState } from 'react'
import './signup.css'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const testClick = () => {
        alert("Button is working!")
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

            <button
                type="button"
                onClick={testClick}
                style={{
                    cursor: 'pointer',
                    zIndex: 9999,
                    position: 'relative',
                    pointerEvents: 'auto'
                }}
            >
                SignUp
            </button>

        </div>
    )
}

export default Signup
```