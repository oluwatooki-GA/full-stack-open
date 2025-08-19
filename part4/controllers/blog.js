const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user");
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username:1,name:1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const { title, url } = request.body

    if (!title || !url) {
        return response.status(400).end()
    }


    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog( { title,url,author:user.username ,user:user._id})
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const updates = request.body
    const updatedBlogPost = await Blog.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true, context: 'query' })

    if (!updatedBlogPost) {
        return res.status(404).json({ error: 'Blog not found' })
    }

    response.json(updatedBlogPost)
})
module.exports = blogRouter