const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blog_api_test_helper')
const userHelper = require('./users_api_test_helper')
const api = supertest(app)
const { test, after, beforeEach, describe } = require('node:test')

describe('Blog API tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        await userHelper.addLoginUser()
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
        const loginResponse = await api
            .post('/api/login')
            .send(userHelper.loginUser)
            .expect(200)

        const token = loginResponse.body.token

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const returnedBlog = response.body
        assert.strictEqual(returnedBlog.title, helper.newBlogPost.title)
        assert.strictEqual(returnedBlog.url, helper.newBlogPost.url)

        const blogs = await helper.blogPostsInDb()
        assert.strictEqual(blogs.length, helper.initialBlogPosts.length + 1)
    })

    test('POST /api/blogs defaults likes to 0 if missing', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send(userHelper.loginUser)
            .expect(200)

        const token = loginResponse.body.token

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('POST /api/blogs returns 400 if title is missing', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send(userHelper.loginUser)
            .expect(200)

        const token = loginResponse.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.blogMissingTitle)
            .expect(400)
    })

    test('POST /api/blogs returns 400 if url is missing', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send(userHelper.loginUser)
            .expect(200)

        const token = loginResponse.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.blogMissingUrl)
            .expect(400)
    })

    test('POST /api/blogs fails with 401 if token is not provided', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlogPost)
            .expect(401)
    })

    test('DELETE /api/blogs/:id deletes a blog', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send(userHelper.loginUser)
            .expect(200)

        const token = loginResponse.body.token

        const newBlogResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlogPost)
            .expect(201)

        const blogToDelete = newBlogResponse.body

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogPostsInDb()
        const deletedBlog = blogsAtEnd.find(blog => blog.id === blogToDelete.id)
        assert.strictEqual(deletedBlog, undefined)
    })

    test('PUT /api/blogs/:id updates a blog', async () => {
        const blogsAtStart = await helper.blogPostsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedData = { likes: 100 }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
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
})
