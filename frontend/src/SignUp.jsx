function SignUp() {
    return(
        <>
        <input type="text" placeholder="Enter name..." value={name} />
        <input type="email" placeholder="Enter email..." value={email} />
        <input type="password" placeholder="Enter password..." value={password} />
        <button>Sign Up</button>
        </>
    )
}

export default SignUp