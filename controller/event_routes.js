const express = require('express')
const fetch = require('node-fetch')
////////////////////////////////////
// Creaet a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////
const Event = require('../models/event')
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
    
    //const APIrequestUrl = process.env.APIURL

    //send the fetch request to the HebCal API
//    fetch(APIrequestUrl)
//     .then(res => res.json())
//     .then(data => {
//         console.log('data here-->', data)
//         res.render('index', {data})
           
//     })
//     .catch(err => console.log(err.json())) 

})

//POST route 
// router.post('/', (req, res) => {
    
       
// })

//SHOW Route
router.get('/:id', (req, res) => {
    const {id} = req.params

    Event.findById(id)
        .then(data => {
            // const userId = req.session.userId
            // const username = req.session.username
            res.render('show', {data}) //, userId, username
        })
        .catch(err => {
            res.json(console.log(err))
        })
})
module.exports = router