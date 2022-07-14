const mongoose = require('./connection')

const { Schema, model } = mongoose


const calSchema = new Schema({
    name: String,
    description: String,
    events: [],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'   
    },
    //comments: [commentSchema]
}, {
    timestamps: true
})

const PersonalCal = model('PerdsonalCal', calSchema)

module.exports = PersonalCal

// - Personal Calendar
//   - Name: string
//   - Description: string
//   - Events: Array of strings by 
//   - owner