const mongoose = require('./connection')
const Event = require('./event.js')
const { Schema, model } = mongoose


const calSchema = new Schema({
    name: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'   
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
}, {
    timestamps: true
})

const PersonalCal = model('PersonalCal', calSchema)

module.exports = PersonalCal