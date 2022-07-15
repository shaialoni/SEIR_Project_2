const express = require('express')
const fetch = require('node-fetch')
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
const PersonalCal = require('../models/personalCal')

//Main page route
router.get('/', (req, res) => {
    Event.find({})
        // return fruits as JSON
        .then(data => {
            //res.json(fruit)
            res.render('index', {data})
        })
        .catch(err => {
            res.json(err)
        })
})

//SHOW Route
router.get('/:eventId', (req, res) => {
    const {eventId} = req.params

    Event.findById(eventId)
        .then(data => {
            // const userId = req.session.userId
            // const username = req.session.username
            //console.log(data)
            res.render('show', {data}) //, userId, username
        })
        .catch(err => {
            res.json(console.log(err))
        })
})

module.exports = router
