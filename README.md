# Welcome to the Calendar App!
The app has a list of events from the jewish calendar (currently all events for the year 2023, more user input coming soon).
You have access to view all data without logging in, however, if you sign up, it opens access to create personal calendars, where you can save events from the main event list, or create and edit personal events.

# Tech used
The app was created using HTML, CSS, Express, Liquid templating language, node.js, JavaScript, mongoDB, Mongoose ODM. 
The app is deployed using the mongoDB Atlas cloud tool, and hosted with Heroku.

# API info
I used heb cal API for this app. You can find more information online at https://www.hebcal.com/home/developer-apis

# Installation instructions - 

To switch the app from local to online mode, you will need to adjust the connection.js file and server.js file.
You will need to create an .env file, make sure you have a SECRET=XXX, APIURL=(API url call), DATABASE_URI=(local network address for database) or MONGODB_URI=(mongodb cloud path) and PORT=(port number)

You will need to run in your terminal: 
```console
$ npm install
```

# Link to live site on Heroku:

https://seir-6-6-project-2-calendar.herokuapp.com/cal/

# Route Table

|Name:|Path:|HTTP Verb|Purpose|
|:---|:---|:---|:---|
|Index|/event|GET|Display all info from API|
|Show|/event/:id|GET|Display single item from API|
|Index|/cal/list|GET|Display list of all personal calendars (for user)|
|New|/cal/new|GET|Display new calendar creation form|
|Create|/cal/new|POST|Create the new calendar in the DB|
|Create|/cal/add/:calId/:eventId|GET|Add an existing event to a personal calendar|
|Show|/cal/select/:eventId|GET|Display a list of calendars to save an event to from main index|
|Show|/cal/:calId|GET|Show page for personal cal - index of events saved on it|
|Show|/cal/show/:eventId/:calId|GET|Display single event from personal calendar|
|New|/cal/newEvent/:calId|GET|Displays a form to add a new entry|
|Create|/cal/newEvent/:calId|POST|Create the new entry in the DB|
|Edit|/cal/:calId/:eventId/edit|GET|Show edit item form|
|Update|/cal/:calId/:eventId|PUT|Update a single item|
|Destroy|/cal/show/:calId/eventId|DELETE|Delete single saved item|
|Destroy|/cal/:calId|DELETE|Delete a personal calendar|

# Entity Relationship Diagram (ERD):
![](Planning/ERD.png)

# Planning wire Frames:
![](Planning/wire%20frames.png)


# PLANNING PROCESS - Hebrew Calendar App

# User stories ('As a user...')
- View all calendar items from API - Index
  - import all calendar items to different schemas according to type
  - look for all calendar entries
  - display all calendar entries

- View single calendar item from API - Show
  - look for one calendar item
  - display single item searched for
  - Save single calendar item to personal folder

- Personal calendar - View all items - Saved
  - look for all items in personal folder
  - display all items in personal folder

- Personal calendar - Create new entry - New
  - new schemas (different schemas depending on event type)
  - create the different models to use

- Personal calendar - Edit a single entry - Edit
  - look for a single entry
  - edit that entry
  - get back the updated version

- Personal calendar - Delete single entry - Delete
  - look for a single entry
  - remove entry from db
  - display confirmation


# Schemas
- Event entry
  - Category: string
  - title: String / time
  - time: date / time
  - memo: string
  - hebrew: string
  - hebrew date: string
  - yomtov: boolean
  - owner

- Personal Calendar
  - Name: string
  - Description: string
  - Events: Array of strings by 
  - owner