////////////////////////////////////
//First import dependencies
////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

////////////////////////////////////
// Creaet a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////

// one GET to show the form
router.get('/signup', (req, res) => {
    //res.send('tada')
    res.render('users/signup')
})

// one POST to make the DB request
router.post('/signup', async (req, res) => {
    console.log('this is our initial request body', req.body)
    // first we need to encrypt our password
    // thats why we made this an async function
    // because the password hashing takes time, we want to wait until it's done before things progress
    //we need to wait for bcrypt to run it's salt rounds before continuing
    // salt rounds are like saying "encrypt this x amount of times before"
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    //now that our password is hashed we can create a user
    console.log('this is our initial request body', req.body)
    User.create(req.body)
        // if created successfuly we'll redirect to login page 
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

//two login routes
// one GET to show the form
router.get('/login', (req, res) => {
    res.render('users/login')
})
// one POST to login and create the session
router.post('/login', async (req, res) => {
    // take a look at our req obj
    //console.log('this is the request object', req)
    // destructure data from request body
    console.log('reqbody', req.body)
    const {username, password} = req.body
    console.log('this is username', username)
    console.log('this is password', password)
    console.log('this is the session', req.session)
    //first we find the user
    User.findOne({username})
    // we check if the user exists
    // if they do, we will compare passwords to make sure it's correct
        .then(async (user) => { // looking for ._id
        if (user) {
            // compare the pw
            //bcrypt.compare evaluates to a truthy or a falsy value
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                // if the compare comes back truthy we store the user properties in session
                req.session.username = username
                req.session.loggedIn = true
                req.session.userId= user._id
                //redirect to /main page
                console.log('this is the session after login', req.session)
                res.redirect('/cal')
            } else {
                // for now just send json error
                res.json({error: 'user does not exist'})
            }
        } else {
            //send error if the user doesnt exist
            res.json({error: 'user does not exist'})
        }
        // if it is, we'll use the newly created session object
            // if they dont, we'll redirect to the sign up page
            

            
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})
//logout route
//can be a get that calls destroy on our session
// we can add an 'are you sure' page if there is time
router.get('/logout', (req, res) => {
    //destroy the session and redirect to the main page
    req.session.destroy(ret => {
        console.log('this is the error in logout', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/cal')
    })
})
////////////////////////////////////
// Export our routes
////////////////////////////////////

module.exports = router