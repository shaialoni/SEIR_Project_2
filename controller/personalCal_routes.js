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
            console.log('going to get edited', event)
            res.render('personal/PCeventEdit', {calId, eventId, event} )
        })
        .catch(err => console.log(err))    
})

//PUT update route - update the edited calendar entry
//test code
router.put('/:calId/:eventId', (req, res)=> {
    const {calId} = req.params
    const {eventId} = req.params
    //console.log('reqbody', req.body)
    Event.findByIdAndUpdate(eventId, req.body)
        .then(event => {           
            //console.log('event after', event)
            event.save()
            res.redirect(`/personal/${calId}`)       
        })
        .catch(err => console.log(err))
})
        




//GET Route - display a new evntry form
router.get('/newEvent/:calId', (req, res) => {
    const {calId} = req.params
    res.render('personal/PCnewEvent', {calId})
})

//CREATE POST Route - post new event
//Test code
router.post('/newEvent/:calId', (req, res) => {
    const {calId} = req.params
    PersonalCal.findById(calId)
        .then(cal => {
            //console.log('im cal', cal)
            //we push the event to the calendara events field's array.
            //console.log('im the event going in', event)
            console.log('reqbody', req.body)
            Event.create(req.body)
                .then(event => {
                    event.calId = calId
                    console.log('do I have calId?', event)
                    cal.events.push(event)
                    cal.save()
                    console.log('this is the updated cal', cal)
                    res.redirect(`/personal/${cal._id}`)
                })
                .catch(err => console.log)
            console.log(cal.events)   
        })
        .catch(err => console.log(err))
})


// router.post('/newEvent/:calId', (req, res) => {
//     const {calId} = req.params
//     PersonalCal.findById(calId)
//         .then(cal => {
//             //console.log('im cal', cal)
//             //we push the event to the calendara events field's array.
//             //console.log('im the event going in', event)
//             console.log('reqbody', req.body)
//             cal.events.push(req.body)
//             cal.save()
//             console.log('this is the updated cal', cal)
//             res.redirect(`/personal/${cal._id}`)
//         })
//         .catch(err => console.log(err))

// })

//Main Personal Calendar page route
router.get('/list', (req, res) => {   
    PersonalCal.find({})
        .then(data => {
            console.log(req.session)
            const owner = req.session.userId
            res.render('personal/showPersonalCal', {data, owner})     
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
    const owner = req.session.userId
    PersonalCal.find({})
        .then(data => {
            //console.log(data)
            res.render('personal/calSelection', {eventId, data, owner})
        })
        .catch(err => console.log(err))  
})

// GET route push a single event to personal calendar
router.get('/add/:calId/:eventId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    
    // Single event is sent here to be added to personal calendar
    // we bring the event up
    Event.findById(eventId)
        .then(event => {
            //We tag the event with the ow
            //event.owner = req.session.userId
            //Since we want a copy of the event, until I figure out how to do it....
            // I am assigning manually every field of the event to a new object
            const newEvent = {title: '', date: '', hdate: '', category: '', hebrew: '', memo: '', yomtov: Boolean, owner: ''}
            newEvent.title = event.title
            newEvent.date = event.date
            newEvent.hdate = event.hdate
            newEvent.category = event.category
            newEvent.hebrew = event.hebrew
            newEvent.memo = event.memo
            newEvent.yomtov = event.yomtov
            newEvent.calId = calId // I am tagging the new event with the calendar ID of the calendar they will belong to
            newEvent.owner = event.owner
            console.log('im an event without an id', newEvent)
            // I use this object to create a new event. Identical, but with a different _id
            Event.create(newEvent)
                .then(newEvent => {
                     // we then bring up the calendar we want to add the event to
                    PersonalCal.findByIdAndUpdate(calId)
                        .then(cal => {
                        //we push the event to the calendara events field's array.
                        //console.log('im calid', cal._id, calId)
                        //console.log('im cals name', cal.name)
                        cal.events.push(newEvent)
                        //save the document
                        cal.save()
                        res.redirect(`/personal/${calId}`)
                        })
                        .catch(err => console.log(err))
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
// test code
router.delete('/show/:calId/:eventId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    PersonalCal.findById(calId) 
        .then(calendar => {
            console.log(' lets check it out', calendar.events.id)
            const event = calendar.events.id(eventId)
            console.log(eventId, calId)
            event.remove()
            return event.save()
        })
        .then(event => {
            res.redirect(`/personal/${calId}`)
        })
        .catch(err => console.log(err))
})
    

        



//working code
// router.delete('/show/:calId/:eventId', (req, res) => {
//     const {eventId} = req.params
//     const {calId} = req.params
//     PersonalCal.findOne({_id: calId})
//         .then(cal => {
//             console.log(cal.events[0]._id)
//             cal.events.forEach((item, i) => {
//                 if (item._id == eventId) {
//                     cal.events.splice(i, 1)
//                     cal.save()
//                     res.redirect(`/personal/${calId}`)
//                 }
//             })
//         })
//         .catch(err => console.log(err))
// })

//SHOW Route - show events from personal calendar
// test code - working
router.get('/show/:eventId/:calId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    console.log('tryin to pass calid', calId)
    Event.findById(eventId)
        .then(item => {
            console.log('item', item)
            res.render('personal/showOnPersonal', {item, calId})
        })
        .catch(err => console.log(err))
})

module.exports = router

//Working code
//PUT update route
// router.put('/:calId/:eventId', (req, res)=> {
//     const {calId} = req.params
//     const {eventId} = req.params
//     console.log('reqbody', req.body)
//     PersonalCal.findById(calId)
//         .then(cal => {           
//             cal.events.forEach((item, i) => {
//                 if (item._id == eventId) {
//                     //console.log('preslice', cal)
//                     cal.events.splice(i, 1)
//                     //console.log('postslice', cal)
//                     cal.events.push(req.body)
//                     //console.log('post push', cal)
//                     cal.save()
//                     //console.log('edited', item)                   
//                     res.redirect(`/personal/${calId}`)
//                 }
//             })
//         })
//         .catch(err => console.log(err))
// })

//old code SHOW route - show events from personal calendar
// router.get('/show/:eventId/:calId', (req, res) => {
//     const {eventId} = req.params
//     const {calId} = req.params
//     console.log('tryin to pass calid', calId)
//     PersonalCal.findById(calId)
//         .then(data => {
//             console.log('data', data)
//             data.events.forEach((item, i) => {
//                 if (item._id == eventId) {
//                     console.log('item', item)
//                     res.render('personal/showOnPersonal', {item, calId})
//                 }
//             })
//         })
//         .catch(err => console.log(err))
// })