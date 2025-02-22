const BlogPost = require('../models/Blog')
const Subscribers = require('../models/Subscriber')
const Admin = require('../models/Admin')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt') // NOTE: not used it yet

// NOTE: the access to a lot of these routes will eventaully be private, rn we arent setting up any authorization rn.
// just setting up the REST API up and running so we can create the front end
// we will later come back and lock it all in later



// @desc Get all blogs
// @route GET/blog
// @access Public
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await BlogPost.find()
        .select('title slug publishDate content.summary metadata tags timestamps') // NOTE: here something like .select('-password') makes sure no password is sent back
        .sort({ 'timestamps.created': -1 })  // what about .lean()
        .exec()

    if (!blogs) {
        return res.status(404).json({ message: 'No blogs found' })
    }

    res.json(blogs)
})

// @desc Create new blog
// @route POST /blog
// @access Private
const createNewBlog = asyncHandler(async (req, res) => {
    const { title, slug, content, tags, publishDate } = req.body

    // Confirm data
    if (!title || !slug || !content || !publishDate) {
        return res.status(400).json({ message: 'All required fields must be provided' })
    }

    // Check for duplicate slug. No 2 blogs should have same slug
    // NOTE: .lean() is to make sure that we do not have the methods returned with this like the other methods here
    const duplicate = await BlogPost.findOne({ slug }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate slug' })
    }

    // Create blog post
    // NOTE: could add everything inside create into a const blogObject
    // then pass it as const blogPost = await BlogPost.create(blogObject) as well

    const blogPost = await BlogPost.create({
        title,
        slug,
        publishDate,
        content: {
            summary: content.summary || content.fullContent.substring(0, 200) + '...', // Create summary if not provided
            fullContent: content.fullContent,
            contentType: content.contentType || 'html'
        },
        metadata: {
            isNew: true // Will be true for newly created posts
        },
        tags: tags || [],
        timestamps: {
            created: Date.now(),
            lastModified: Date.now()
        }
    }).exec()


    // TODO: no idea what the below code does tbh
    // i just know putting all values in a const and then creating and storing new user

    // If blog is created successfully
    if (blogPost) {
        // Update navigation links of adjacent posts if needed
        const previousPost = await BlogPost.findOne({
            publishDate: { $lt: publishDate }
        }).sort({ publishDate: -1 })

        const nextPost = await BlogPost.findOne({
            publishDate: { $gt: publishDate }
        }).sort({ publishDate: 1 })

        if (previousPost) {
            blogPost.navigation.previousPost = previousPost._id
            previousPost.navigation.nextPost = blogPost._id
            await previousPost.save()
        }

        if (nextPost) {
            blogPost.navigation.nextPost = nextPost._id
            nextPost.navigation.previousPost = blogPost._id
            await nextPost.save()
        }

        await blogPost.save()
        res.status(201).json({ message: `New blog ${title} created`})
    } else {
        res.status(400).json({ message: 'Invalid blog data received' })
    }
})

// @desc Update a blog
// @route PATCH /blog
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
    // NOTE: id is assigned by mongodb
    // TODO: could actually also use slug instead of ID since slug is unique

    const { id, title, slug, content, tags, publishDate } = req.body

    // Confirm data
    if (!id || !title || !slug || !content || !publishDate) {
        return res.status(400).json({ message: 'All required fields must be provided' })
    }

    // Find blog
    const blog = await BlogPost.findById(id).exec()

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' })
    }

    // Check for duplicate slug
    if (slug !== blog.slug) {
        const duplicate = await BlogPost.findOne({ slug }).lean().exec()

        // NOTE: We need to allow updates to the original user, otherise it will also catch the current user we are working with
        // NOTE: if duplicate (id here created by mongodb i.e duplicate?._id.toString()) is not the same as the id we got as the variable from the
        // request body (initial line here const { id } = req.body )
        // then we have a duplicate otherwise if they are the same that means we are working
        // on the same blog
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate slug' })
        }
    }

    // Update blog
    blog.title = title
    blog.slug = slug
    blog.content = {
        summary: content.summary || content.fullContent.substring(0, 200) + '...',
        fullContent: content.fullContent,
        contentType: content.contentType || blog.content.contentType
    }
    blog.tags = tags || blog.tags
    if (publishDate) blog.publishDate = publishDate
    blog.timestamps.lastModified = Date.now()

    const updatedBlog = await blog.save()

    res.json({ message: `${updatedBlog.title} updated`})
})

// @desc Delete a blog
// @route DELETE /blog
// @access Private
const deleteBlog = asyncHandler(async (req, res) => {
    // TODO: could actually also use slug instead of ID since slug is unique
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Blog ID required' })
    }

    const blog = await BlogPost.findById(id).lean().exec()

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' })
    }

    // Update navigation links of adjacent posts
    if (blog.navigation.previousPost) {
        const previousPost = await BlogPost.findById(blog.navigation.previousPost)
        if (previousPost) {
            previousPost.navigation.nextPost = blog.navigation.nextPost
            await previousPost.save()
        }
    }

    if (blog.navigation.nextPost) {
        const nextPost = await BlogPost.findById(blog.navigation.nextPost)
        if (nextPost) {
            nextPost.navigation.previousPost = blog.navigation.previousPost
            await nextPost.save()
        }
    }

    const result = await blog.deleteOne() // NOTE: data deleted from database but saved in result

    res.json({ message: `Blog ${result.title} with ID ${result._id} deleted`})
})

module.exports = {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    deleteBlog
}