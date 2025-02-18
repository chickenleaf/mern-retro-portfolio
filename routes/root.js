const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => { // NOTE: this regex is explained in 20.42 mints
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router