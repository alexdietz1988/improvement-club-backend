const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
    userId: Number,
    data: Object
})

const Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = Challenge