const { options } = require('../routes/root')
const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // NOTE: first part makes sure that only the ones in our list can access it and second part makes sure that things like postman can also access it
            callback(null, true) // NOTE: first is error callback second is allowed boolean
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions