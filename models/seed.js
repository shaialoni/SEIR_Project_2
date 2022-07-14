////////////////////////////////////
//The file runs on 'npm run seed'
////////////////////////////////////

////////////////////////////////////
//Import Dependencies
////////////////////////////////////
const mongoose = require('./connection')
const Event = require('./event')
const fetch = require('node-fetch')
const PersonalCal = require('./personalCal')

////////////////////////////////////
//Seed Code
////////////////////////////////////
// db connection to var for easy reference later
const db = mongoose.connection

// this runs the callback function when the db connection is opened from this file
db.on('open', () => {
    //Save the API data to a variable

    const APIrequestUrl = process.env.APIURL

    //send the fetch request to the HebCal API
   fetch(APIrequestUrl)
    .then(res => res.json())
    .then(data => {
        const APIdata = data.items
        // console.log('data here-->', data)
        console.log(APIdata)
        //when we seed data, we usualy clear the db first
        Event.deleteMany({})
        //then we create the data
            .then(deletedEvents => {
                console.log('this is what remove returns', deletedEvents)

                //now that our delete was succesfull, we can create our fruits
                Event.create(APIdata)
                    .then(data => {
                        console.log('New data', data)
                        db.close()
                    })
                    .catch(error => {
                        console.log('error', error)
                        db.close()
                    })
                })
            .catch(error => {
                console.log('error', error)
                db.close()
            })
             // whether it's succesful or not we want to close our db connection
        })

       
    .catch(err => console.log(err.json())) 
})
