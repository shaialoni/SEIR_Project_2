const express = require('express')
const fetch = require('node-fetch')
////////////////////////////////////
// Creaet a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////
//Main page route
router.get('/', (req, res) => {
    const APIrequestUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&start=2023-01-01&end=2023-12-31&month=x&ss=on&mf=off&c=on&geo=geoname&zip=94520&M=on&s=on`
    
    //send the fetch request to the HebCal API
   fetch(APIrequestUrl)
    .then(res => res.json())
    .then(data => {
        console.log('data here-->', data)
        res.render('index', {data})
           
    })
    .catch(err => console.log(err.json())) 

})

//POST route 
router.post('/', (req, res) => {
    
       
})

module.exports = router
