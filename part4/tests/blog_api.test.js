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
    const response = await api.get('/api/blog')
    assert.strictEqual(response.body.length, helper.initialBlogPosts.length)
})

after(async () => {
    await mongoose.connection.close()
})