const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        let user = req.body.user

        if (req.body.loginType === 'login') {
            const foundUser = await db.User.findOne({ user })
            if(!foundUser) return res.json({ success: false, error: 'invalid username or password' })
            
            const match = await bcrypt.compare(req.body.password, foundUser.password)
            if(!match) return res.json({ success: false, error: 'invalid username or password' })
        
        } else if (req.body.loginType === 'signup') {
            const foundUser = await db.User.exists({ user })
            if (foundUser) return res.json({ success: false, error: 'user already exists' })
            
            const salt = await bcrypt.genSalt(12)
            const hash = await bcrypt.hash(req.body.password, salt)
            req.body.password = hash

            await db.User.create(req.body)
        }
        return res.json({ success: true })

    } catch (error) {
        console.log(error)
        req.error = error
        return res.json({ success: false, error })
    }
})

module.exports = router