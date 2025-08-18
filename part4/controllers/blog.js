const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const {blogWithoutLikes} = require("../tests/blog_api_test_helper");

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


module.exports = blogRouter