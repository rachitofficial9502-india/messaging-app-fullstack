const User = require("../models/user.js")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function signUp(req, res) {

    console.log("hit signup...")
    console.log("body receiver:", req.body)

    let { name, email, password } = req.body
    
    if (name == "" || email == "" || password == "" || name == undefined || email == undefined || password == undefined) {
        return res.status(400).json({
            success: false,
            message: "Required input fields can't be empty!"
        })
    }

    console.log("signup fields are correct...")

    try {
        console.log("finding user in db...")
        const user = await User.findOne({email: email})
        
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }
        console.log("user is new...")
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        console.log("user created...")
        return res.status(201).json({
            success: true,
            message: "User created succesfully."
        })
    }
    catch(err) {
        console.log("hit signup error...")
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error!"
        })
    }

}

async function login(req, res) {
    console.log("hit login...")
    console.log("body:", req.body)

    const { email, password } = req.body
    if (email == "" || password == "" || email == undefined || password == undefined) {
        return res.status(400).json({
            success: false,
            message: "Required input fields can't be left empty!"
        })
    }
    console.log("input fields are correct...")
    
    try {
        const user =  await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({
            success: false,
            message: "Invalid credentials!"
            })
        }
        console.log("email correct...")
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            })
        }
        console.log("password matched...")
        const token = jwt.sign({email: email, id: user._id}, process.env.JWT_SECRET)
        console.log("token created...")
        const userId = user._id
        
        return res.status(200).json({
            success: true,
            message: "You can login!",
            userId: userId,
            token: token
        })

    }
    catch(err) {
        console.log("hit login error...")
        console.log("Error:", err)
        return res.status(500).json({
            success: false,
            message: "Server error!"
        })
    }
}

function logout(req, res) {

}


module.exports = {
    signUp, login, logout
}