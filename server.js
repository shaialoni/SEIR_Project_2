/////////////////////////////////
// import dependencies
/////////////////////////////////
require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const morgan = require('morgan')
const methodOverride = require('method-override')
const eventRoutes = require('./controller/event_routes')
const userRoutes = require('./controller/user_routes')
const personalCalRoutes = require('./controller/personalCal_routes')

////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
// session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')

// here's the middware that set up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)
////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/cal', eventRoutes)
app.use('/users', userRoutes)
app.use('/personal', personalCalRoutes)

//localhost:3000/
app.get('/', (req, res) => {
	res.send('<a href="/cal/"> Take me home</a>')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})