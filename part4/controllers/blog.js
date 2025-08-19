const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const { title, url } = request.body
    if (!title || !url) {
        return response.status(400).end()
    }
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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