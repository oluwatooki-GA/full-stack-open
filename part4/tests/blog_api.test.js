const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./blog_api_test_helper')
const api = supertest(app)
const { test, after, beforeEach } = require('node:test')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogPosts)
})

test('GET /api/blog returns blogs as json', async () => {
    await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('GET /api/blog returns correct number of blogs', async () => {
    const response = await api.get('/api/blog')
    assert.strictEqual(response.body.length, helper.initialBlogPosts.length)
})

test('POST /api/blog adds a new blog', async () => {
    const response = await api.post('/api/blog').send(helper.newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body
    assert.strictEqual(returnedBlog.title, helper.newBlogPost.title)
    assert.strictEqual(returnedBlog.author, helper.newBlogPost.author)
    assert.strictEqual(returnedBlog.url, helper.newBlogPost.url)
    assert.strictEqual(returnedBlog.likes, helper.newBlogPost.likes)

    const blogs = await helper.blogPostsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogPosts.length + 1)
})

after(async () => {
    await mongoose.connection.close()
})
