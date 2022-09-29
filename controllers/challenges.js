const express = require('express')
const router = express.Router()
const db = require('../models')

// FETCH CHALLENGES
router.get('/', async (req, res) => {
    try {
        const challenge = await db.Challenge.findOne({ userId: req.body.userId })
        res.json({
            success: true,
            data: challenge
        })
    } catch (error) {
        console.log(error)
        req.error = error
        return res.json({ success: false, error })
    }
})

module.exports = router