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

test('GET /api/blogs returns blogs as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('GET /api/blogs returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogPosts.length)
})

test('POST /api/blogs adds a new blog', async () => {
    const response = await api.post('/api/blogs').send(helper.newBlogPost)
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

test('POST /api/blogs defaults likes to 0 if missing', async () => {

    const response = await api.post('/api/blogs').send(helper.blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.likes, 0)
})

test('POST /api/blogs returns 400 if title is missing', async () => {
    const blogMissingTitle = {
        author: 'Author',
        url: 'https://example.com/',
        likes: 5
    }
    await api.post('/api/blogs').send(blogMissingTitle)
        .expect(400)
})

test('POST /api/blogs returns 400 if url is missing', async () => {
    const blogMissingUrl = {
        title: 'Missing URL',
        author: 'Author',
        likes: 5
    }
    await api.post('/api/blogs').send(blogMissingUrl)
        .expect(400)
})

test('DELETE /api/blogs/:id deletes a blog', async () => {
    const blogsAtStart = await helper.blogPostsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogPostsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('PUT /api/blogs/:id updates a blog', async () => {
    const blogsAtStart = await helper.blogPostsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedData = { likes: 100 }

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 100)

    const blogsAtEnd = await helper.blogPostsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, 100)
})

after(async () => {
    await mongoose.connection.close()
})
