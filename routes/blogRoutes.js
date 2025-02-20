const express =require('express')
const router = express.Router()
const blogsController = require('../controllers/blogsController')

router.route('/')    // NOTE: chain different methods here
    .get(blogsController.getAllBlogs)  // any get request we get to /blog we respond w this by directing to a controller
    .post(blogsController.createNewBlog) // different controller or response to that
    .patch(blogsController.updateBlog) // aka update if we look at things like CRUD
    .delete(blogsController.deleteBlog)

module.exports = router