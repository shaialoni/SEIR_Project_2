const express = require('express')
const fetch = require('node-fetch')
const mongoose = require('mongoose')
const db = mongoose.connection
////////////////////////////////////
// Create a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////
const Event = require('../models/event')
const PersonalCal = require('../models/personalCal')

//DESTROY route 
router.delete('/:calId', (req, res) => {
    const {calId} = req.params 
    const userInfo = req.session.username
    PersonalCal.findById(calId)
        .then(calendar => {
            // compare calendar owner to logged in user before erasing
            if (calendar.owner == req.session.userId) {
                //once identity confirmed and authorized, we find the calendar and delete it
                PersonalCal.findByIdAndDelete(calId)
                .then(calendar => res.redirect('/personal/list'))
                .catch(err => console.log(err))
            } else {
                res.render('users/login', {userInfo})
            }
        })
        .catch(err => console.log(err))  
})

//GET Route - display a calendar entry edit form
router.get('/:calId/:eventId/edit', (req, res) => {
    const {calId} = req.params
    const {eventId} = req.params
    const userInfo = req.session.username
    //find the event we want to edit
    Event.findById(eventId)
        .then(event => {
            //send to edit liquid page for editing, attach CalId, eventId and event data as variables
            res.render('personal/PCeditEvent', {calId, eventId, event, userInfo} )
        })
        .catch(err => console.log(err))    
})

//PUT update route - update the edited calendar entry
//test code
router.put('/:calId/:eventId', (req, res)=> {
    const {calId} = req.params
    const {eventId} = req.params
    //find the event being edited, and assign the edited fields to the event
    console.log('reqbody', req.body)
    req.body.yomtov = req.body.yomtov === 'on' ? true:false
    Event.findById(eventId)
        .then(event => {
            console.log('pre edited event', event)
            event.title = req.body.title 
            event.date = req.body.date
            event.hdate = req.body.hdate 
            event.category = req.body.category
            event.hebrew = req.body.hebrew
            event.memo = req.body.memo 
            event.yomtov = req.body.yomtov 
            event.calId = calId
            console.log('post edit event', event)
            // save the edited document
            return event.save()
        })
        .then (event => {    
            res.redirect(`/personal/${calId}`)       
        })
        .catch(err => console.log(err))
})
        
//GET Route - display a new evntry form
router.get('/newEvent/:calId', (req, res) => {
    const {calId} = req.params
    const userInfo = req.session.username
    res.render('personal/PCnewEvent', {calId, userInfo})
})

//CREATE POST Route - post new event on personal calendar
//Test code
router.post('/newEvent/:calId', (req, res) => {
    const {calId} = req.params
    console.log('calid', calId)
    PersonalCal.findById(calId)
        .then(cal => {
            console.log('cal', cal)
            console.log('reqbody', req.body)
            //we push the event to the calendara events field's array.
            Event.create(req.body)
                .then(event => {
                    console.log('new event', event)
                    event.calId = calId
                    cal.events.push(event)
                    cal.save()
                    res.redirect(`/personal/${cal._id}`)
                })
                .catch(err => console.log)
        })
        .catch(err => console.log(err))
})

//Main Personal Calendar page route
router.get('/list', (req, res) => {  
    const userInfo = req.session.username
    PersonalCal.find({})
        .then(data => {
            const owner = req.session.userId
            res.render('personal/showPersonalCal', {data, owner, userInfo})     
        })
        .catch(err => console.log(err))
})

// GET route - create a new calendar
router.get('/new', (req, res) => {
    const userInfo = req.session.username
    res.render('personal/newCal' , {userInfo})
})
//POST route - create a new calendar
router.post('/new', (req, res) => {
    console.log('this route')
    console.log('loggedin', req.session)
    // make sure a user is logged in before creating a calendar
    if (req.session.loggedIn === true) {
        req.body.owner = req.session.userId
        PersonalCal.create(req.body)
            .then(calendar => {
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
    const userInfo = req.session.username
    PersonalCal.find({})
        .then(data => {
            res.render('personal/calSelection', {eventId, data, owner,userInfo})
        })
        .catch(err => console.log(err))  
})

// GET route push a single event to personal calendar
router.get('/add/:calId/:eventId', (req, res) => {
    console.log('going into a personal cal')
    console.log('reqparams', req.params)
    const {eventId} = req.params
    const {calId} = req.params
    
    // Single event is sent here to be added to personal calendar
    // we bring the event up
    Event.findById(eventId)
        .then(event => {
            //Since we want a copy of the event, until I figure out how to do it....
            // I am assigning manually every field of the event to a new object
            console.log('existing event', event)
            const newEventData = {
                title: event.title, 
                date: event.date, 
                hdate: event.hdate, 
                category: event.category, 
                hebrew: event.hebrew, 
                memo: event.memo, 
                yomtov: event.yomtov, 
                owner: event.owner,
            //    ...event._doc, 
                calId: calId // I am tagging the new event with the calendar ID of the calendar they will belong to
            }
            //delete newEvent._id
            console.log('im the new event', newEventData)
            // I use this object to create a new event. Identical to the original, but with a different _id
            Event.create(newEventData)
                .then(newEvent => {
                    console.log('I am the new event after doc creation', newEvent)
                     // we then bring up the calendar we want to add the event to
                    PersonalCal.findById(calId)
                        .then(cal => {
                        console.log('calenda')
                        //we push the event to the calendara events field's array.
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
    const userInfo = req.session.username
    //Find the calendar we want to view
    PersonalCal.findById(calId)   
        .then(cal => { 
            //isolate the events array
            data = cal.events
            console.log('I am the array', data)
            // render the index page, using the events array to supply the data
            res.render('personal/personalIndex', {data, cal, calId, userInfo})
        })
        .catch(err => console.log(err))
})

//DESTROY route - delete event from personal calendar
//working code
router.delete('/show/:calId/:eventId', (req, res) => {
    const {eventId} = req.params
    const {calId} = req.params
    //find the calendar we want to erase the event from
    PersonalCal.findOne({_id: calId})
        .then(cal => {
            // using an array method, find the event using the event ID
            cal.events.forEach((item, i) => {
                if (item._id == eventId) {
                    // remove the event out of the array
                    cal.events.splice(i, 1)
                    // save the document
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
    const userInfo = req.session.username
    Event.findById(eventId)
        .then(item => {
            console.log('showing event', item)
            res.render('personal/showOnPersonal', {item, calId, userInfo})
        })
        .catch(err => console.log(err))
})

module.exports = router

//OLD PUT update route
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

//OLD SHOW route - show events from personal calendar
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

//OLD Create POST Route - post new event on personal calendar
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

//DESTROY route
// test code
// router.delete('/show/:calId/:eventId', (req, res) => {
//     const {eventId} = req.params
//     const {calId} = req.params
//     Event.findByIdAndDelete(eventId)
//         .then(event => {
//             res.redirect(`/personal/${calId}`)
//         })
//         .catch(err => console.log(err))
// })


//DESTROY route - delete event from personal calendar
// test code - currently document.id() function is not working. WHY???
// router.delete('/show/:calId/:eventId', (req, res) => {
//     const {eventId} = req.params
//     const {calId} = req.params
//     PersonalCal.findById(calId) 
//         .then(calendar => {
//              console.log(' lets check it out', calendar.events.id)
//             const event = calendar.events.id(eventId)
//             console.log(eventId, calId)
//             event.remove()
//             return calendar.save()
//         })
//         .then(event => {
//             res.redirect(`/personal/${calId}`)
//         })
//         .catch(err => console.log(err))
// })
  