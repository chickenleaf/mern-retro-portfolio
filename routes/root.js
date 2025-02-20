const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/home(.html)?', (req, res) => { // NOTE: this regex is explained in 20.42 mints
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// router.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'about_page.html'));
// });

// router.get('/blog', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'blog_list.html'));
// });

// // for experiment
// router.get('/blogItem1', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'each_blog.html'));
// });

module.exports = router