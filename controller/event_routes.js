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

//Main Personal Calendar page route
router.get('/personal', (req, res) => {
    PersonalCal.find({})
        // return fruits as JSON
        .then(arr => {
            //res.json(fruit)
            console.log(arr[0].events)
            data = arr[0].events
            res.render('index', {data})
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/personal/new', (req, res) => {
    res.render('newCal')
})

router.post('/personal/new', (req, res) => {
    console.log(req.body)
    
    PersonalCal.create(req.body)
        .then(calendar => {
            console.log(calendar)
        })
        .catch(err => err.json())
})

router.get('/personal/:eventId', (req, res) => {
    //res.send('sup')
    const {eventId} = req.params
    console.log('eventID', eventId)
    // Single event is sent here to be added to personal calendar
    // we bring the event up
    Event.findById(eventId)
        .then(event => {
            console.log('i am the event', event)
            // we then bring up the calendar we want to add the event to
            PersonalCal.findOneAndUpdate({})
                .then(cal => {
                    console.log('im cal', cal)
                    //we push the event to the calendara events field's array.
                    console.log('im the event going in', event)
                    cal.events.push(event)
                    return cal.save()
                })
                .then(cal => {
                    console.log('im cal again', cal)
                    const data = cal.events
                    console.log('im data', data)
                    res.redirect('/cal/personal')
                })
                .catch(err => console.log(err))
        })
        .catch(err => err.json())  
})

//SHOW Route
router.get('/:id', (req, res) => {
    const {id} = req.params

    Event.findById(id)
        .then(data => {
            // const userId = req.session.userId
            // const username = req.session.username
            console.log(data)
            res.render('show', {data}) //, userId, username
        })
        .catch(err => {
            res.json(console.log(err))
        })
})

module.exports = router
