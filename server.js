const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger') // NOTE: custom middleware
const errorHandler = require('./middleware/errorHandler') // NOTE: custom middleware
const cookieParser = require('cookie-parser') // NOTE: third-party middleware
const cors = require('cors') // NOTE: makes our API accessable to others/ makes everything available to the public
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json()) // NOTE: another built-in middleware

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public'))) // NOTE: static is built-in middleware

app.use('/', require('./routes/root'))

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
