const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
////////////////////////////////////
// Creaet a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////
const Event = require('../models/event')
//const PersonalCal = require('../models/personalCal')

//Main page route
router.get('/', (req, res) => {
    const userInfo = req.session.username
    Event.find({})
        .then(data => {
            res.render('index', {data, userInfo})
        })
        .catch(err => {
            res.json(err)
        })
})

//SHOW Route
router.get('/:eventId', (req, res) => {
    const {eventId} = req.params
    const userInfo = req.session.username
    Event.findById(eventId)
        .then(data => {
            res.render('show', {data, userInfo})
        })
        .catch(err => {
            res.json(console.log(err))
        })
})

module.exports = router
