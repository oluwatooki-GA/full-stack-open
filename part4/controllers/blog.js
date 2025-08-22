const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const {userExtractor} = require("../utils/middleware");



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username:1,name:1 })
    response.json(blogs)
})

blogRouter.post('/',userExtractor, async (request, response) => {
    const { title, url,author } = request.body

    if (!title || !url) {
        return response.status(400).json({error:'There has to be a title and url'})
    }


    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user

    const blog = new Blog( { title,url,author: author || user.username ,user:user._id})
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    const returnedBlog = await Blog.findById(savedBlog.id).populate('user',{ username:1,name:1 })

    response.status(201).json(returnedBlog)
})

blogRouter.delete('/:id',userExtractor, async (request, response) => {
    const { id } = request.params

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    const blog = await Blog.findById(id)

    if (!user || !user._id || !blog.user) {
        return response.status(401).json({ error: 'Missing user or blog owner info' })
    }

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'You cannot delete someone elses blog' })
    }

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