const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../models')

router.post('/', async (req, res) => {
    let user = req.body.user
    try {
        // If the user is attempting to login,
        // make sure there's an account with that username,
        // then check if the passwords match
        if (req.body.loginType === 'login') {
            const foundUser = await db.User.findOne({ user })
            if(!foundUser) {
                return res.json({ 
                    success: false,
                    error: 'invalid username or password'
                })
            }
            
            const match = await bcrypt.compare(req.body.password, foundUser.password)
            if(!match) {
                return res.json({
                    success: false,
                    error: 'invalid username or password'
                })
            }

            return res.json({ 
                success: true,
                userId: foundUser._id
            })
        
        // If the user is attempting to signup,
        // make sure there isn't already an account with that username,
        // then create the user account and the associated challenge data
        } else if (req.body.loginType === 'signup') {
            const foundUser = await db.User.exists({ user })
            if (foundUser) {
                return res.json({
                    success: false,
                    error: 'user already exists'
                })
            }
            
            const salt = await bcrypt.genSalt(12)
            const hash = await bcrypt.hash(req.body.password, salt)
            req.body.password = hash

            const createdUser = await db.User.create(req.body)
            await db.Challenge.create({
                userId: createdUser._id,
                data: {}
            })
            return res.json({
                success: true,
                userId: createdUser._id
            })
        }

    } catch (error) {
        console.log(error)
        req.error = error
        return res.json({ success: false, error })
    }
})

module.exports = router