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
        .then(event => {
            const userId = req.session.userId
            const username = req.session.username
            res.render('show', event, userId, username)
        })
        .catch(err => {
            res.json(console.log(err))
        })
})
module.exports = router
