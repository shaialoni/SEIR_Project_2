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
    PersonalCal.findById(calId)
        .then(calendar => {
            console.log('cal.owner', calendar.owner)
            console.log(req.session.userId)
            if (calendar.owner == req.session.userId) {
                PersonalCal.findByIdAndDelete(calId)
                .then(calendar => res.redirect('/personal/list'))
                .catch(err => console.log(err))
            } else {
                res.render('users/login')
            }
        })
        .catch(err => console.log(err))  
})

//GET Route - display a calendar entry edit form
router.get('/:calId/:eventId/edit', (req, res) => {
    const {calId} = req.params
    const {eventId} = req.params
    console.log(eventId)
    Event.findById(eventId)
        .then(event => {
            console.log(event)
            res.render('personal/PCeventEdit', {calId, eventId, event} )
        })
        .catch(err => console.log(err))    
})

//PUT update route - update the edited calendar entry
router.put('/:calId/:eventId', (req, res)=> {
    const {calId} = req.params
    const {eventId} = req.params
    console.log('reqbody', req.body)
    PersonalCal.findById(calId)
        .then(cal => {           
            cal.events.forEach((item, i) => {
                if (item._id == eventId) {
                    //console.log('preslice', cal)
                    cal.events.splice(i, 1)
                    //console.log('postslice', cal)
                    cal.events.push(req.body)
                    //console.log('post push', cal)
                    cal.save()
                    //console.log('edited', item)                   
                    res.redirect(`/personal/${calId}`)
                }
            })
        })
        .catch(err => console.log(err))
})

//GET Route - display a new evntry form
router.get('/newEvent/:calId', (req, res) => {
    const {calId} = req.params
    res.render('personal/PCnewEvent', {calId})
})

//Main Personal Calendar page route
router.get('/list', (req, res) => {   
    PersonalCal.find({})
        .then(data => {
            console.log(data)
            res.render('personal/showPersonalCal', {data})
        })
        .catch(err => console.log(err))
})

// GET route - create a new calendar
router.get('/new', (req, res) => {
    res.render('personal/newCal')
})
//POST route - create a new calendar
router.post('/new', (req, res) => {
    console.log('this route')
    console.log('loggedin', req.session)
    // make sure a user is logged in before creating a calendar
    if (req.session.loggedIn === true) {
        console.log('reqsession', req.session)
        req.body.owner = req.session.userId
        PersonalCal.create(req.body)
            .then(calendar => {
                console.log('updated', req.body)
                res.redirect('/personal/list')
            })
            .catch(err => console.log(err))
    } else {
        res.render('users/login')
    }
})

//GET route to select the calendar to add the item to
router.get('/select/:eventId', (req, res) => {
    const {eventId} = req.params
    PersonalCal.find({})
        .then(data => {
            //console.log(data)
            res.render('personal/calSelection', {eventId, data})
        })
        .catch(err => console.log(err))  
})

// GET route push a single event to personal calendar
router.get('/add/:calId/:eventId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    //console.log('eventID', eventId)
    // Single event is sent here to be added to personal calendar
    // we bring the event up
    Event.findById(eventId)
        .then(event => {
            //console.log('i am the event', event)
            // we then bring up the calendar we want to add the event to
            //console.log('calId before PersonalCal', calId)
            PersonalCal.findByIdAndUpdate(calId)
                .then(cal => {
                    //we push the event to the calendara events field's array.
                    //console.log('im calid', cal._id, calId)
                    //console.log('im cals name', cal.name)
                    cal.events.push(event)
                    cal.save()
                    res.redirect(`/personal/${calId}`)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))  
})

//main events list page in personal cal
//localhost:3000/personal
router.get('/:calId', (req, res) => {
    const {calId} = req.params
    PersonalCal.findById(calId)   
        .then(cal => { 
            data = cal.events
            res.render('personal/personalIndex', {data, cal, calId})
        })
        .catch(err => console.log(err))
})

//DESTROY route - delete event from personal calendar
router.delete('/show/:calId/:eventId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    PersonalCal.findOne({_id: calId})
        .then(cal => {
            console.log(cal.events[0]._id)
            cal.events.forEach((item, i) => {
                if (item._id == eventId) {
                    cal.events.splice(i, 1)
                    cal.save()
                    res.redirect(`/personal/${calId}`)
                }
            })
        })
        .catch(err => console.log(err))
})

//SHOW Route - show events from personal calendar
router.get('/show/:eventId/:calId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    console.log('tryin to pass calid', calId)
    PersonalCal.findById(calId)
        .then(data => {
            console.log('data', data)
            data.events.forEach((item, i) => {
                if (item._id == eventId) {
                    console.log('item', item)
                    res.render('personal/showOnPersonal', {item, calId})
                }
            })
        })
        .catch(err => console.log(err))
})

module.exports = router