import { useState } from 'react'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin() {
    const res  = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    const data = await res.json()

    if (!res.ok) {
        alert(data.message)
        return
    }
    localStorage.setItem('token', data.token)
    localStorage.setItem("userId", data.userId);

    window.location.href = "/chat"

    }

    return(
        <>
        <input type="email" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login