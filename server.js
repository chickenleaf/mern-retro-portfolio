require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger') // NOTE: custom middleware
const errorHandler = require('./middleware/errorHandler') // NOTE: custom middleware
const cookieParser = require('cookie-parser') // NOTE: third-party middleware
const cors = require('cors') // NOTE: makes our API accessable to others/ makes everything available to the public
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json()) // NOTE: another built-in middleware

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public'))) // NOTE: static is built-in middleware

app.use('/', require('./routes/root')) // basic routing

// NOTE: localhost:3500/blog will take me from here to routes/blogRoutes
// there we have code to maintain the GET, POST, PATCH, DELETE requests for the same localhost:3500/blog url
// so things in routes/blogRoutes tells you which function to execute if GET, POST, PATCH, DELETE request is sent to localhost:3500/blog
// now these functions are properly defined in /controllers/blogsController
// in /controllers/blogsController we have the functions that interact with our blogPost database or collection and make CRUD happen
// the schema for what each single entry of blogPost collection or database looks like is defined in /models/Blog.js
app.use('/blog', require('./routes/blogRoutes'))

// NOTE: this 404 goes after all the other routes
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => { // NOTE: listening for the open event
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {  // NOTE: another listener, this listens to the errors
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})