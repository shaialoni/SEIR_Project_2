const mongoose = require('./connection')
const calSchema = require('./cal')

const {Schema, model} = mongoose

const eventSchema = new Schema({
    category: String,
    title: String,
    time: String,
    memo: String,
    hebrew: String,
    yomtov: {
        type: Boolean,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'   
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

const event = model('Event', eventSchema)

module.exports = Event