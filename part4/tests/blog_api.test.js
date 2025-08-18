const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./blog_api_test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogPosts)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('blogs are proper length', async () => {
    const blogs = await api.get('/api/blog')
    assert.strictEqual(blogs.body.length, helper.initialBlogPosts.length)
})


test('blogs unique identifier property of the blog posts is named id', async () => {
    const blogs = await api.get('/api/blog')

    blogs.body.forEach(blog => {
        assert.ok(blog.id, 'Expected blog.id to be defined')
        assert.strictEqual(blog._id, undefined, 'Expected blog._id to be undefined')
    })
})
after(async () => {
    await mongoose.connection.close()
})

