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

//DESTROY route 
router.delete('/:calId', (req, res) => {
    //res.send('lets delete')
    const {calId} = req.params
    PersonalCal.findByIdAndDelete(calId)
        .then(calendar => res.redirect('/personal/list'))
        .catch(err => err.json())
})
//Main Personal Calendar page route
router.get('/list', (req, res) => {
    
    PersonalCal.find({})
        // return fruits as JSON
        .then(data => {
            //res.json(fruit)
            console.log(data)
            res.render('personal/Cal', {data})
        })
        .catch(err => {
            res.json(err)
        })
})


router.get('/new', (req, res) => {
    res.render('personal/newCal')
})

router.post('/new', (req, res) => {
    PersonalCal.create(req.body)
        .then(calendar => {
            res.redirect('/personal/list')
        })
        .catch(err => err.json())
})

router.get('/add/:eventId', (req, res) => {
    //res.send('sup')
    const {eventId} = req.params
    console.log('eventID', eventId)
    // Single event is sent here to be added to personal calendar
    // we bring the event up
    Event.findById(eventId)
        .then(event => {
            //console.log('i am the event', event)
            // we then bring up the calendar we want to add the event to
            PersonalCal.findOneAndUpdate({})
                .then(cal => {
                    //console.log('im cal', cal)
                    //we push the event to the calendara events field's array.
                    //console.log('im the event going in', event)
                    cal.events.push(event)
                    return cal.save()
                })
                .then(cal => {
                    //console.log('im cal again', cal)
                    const data = cal.events
                    //console.log('im data', data)
                    console.log('im calid outgoing', cal._id)
                    res.redirect(`/personal/${cal._id}`)
                })
                .catch(err => console.log(err))
        })
        .catch(err => err.json())  
})

//main events list page in personal cal
//localhost:3000/personal
router.get('/:calId', (req, res) => {
    console.log('im here now')
    const {calId} = req.params
    console.log('im calid incoming', calId)
    PersonalCal.findById(calId)
        // return fruits as JSON
        .then(cal => {
            //res.json(fruit)
            // console.log(data)
            data = cal.events
            console.log('render is next', data)
            res.render('personal/personalIndex', {data, cal})
        })
        .catch(err => {
            res.json(err)
        })
})

//SHOW Route - show events from personal calendar
router.get('/show/:eventId', (req, res) => {
    const {eventId} = req.params
    Event.findById(eventId)
        .then(data => {
            res.render('personal/showOnPersonal', {data})
        })
        .catch(err => err.json())
})

module.exports = router