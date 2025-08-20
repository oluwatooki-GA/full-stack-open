const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')
const Blog = require('../models/blog')
const helper = require('./users_api_test_helper')
const api = supertest(app)
const { test, after, describe, beforeEach } = require('node:test')

describe('Users API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany([])
    })

    test('GET /api/users returns users as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('POST /api/users works properly', async () => {
        await api
            .post('/api/users')
            .send(helper.newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length ,  1)
    })

    // Test: missing username
    test('POST /api/users fails with missing username', async () => {
        const invalidUser = {
            name: 'NoUsername',
            password: '123456'
        }
        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error.includes('missing'), true)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 0)
    })

    // Test: missing password
    test('POST /api/users fails with missing password', async () => {
        const invalidUser = {
            username: 'NoPassword',
            name: 'Test'
        }
        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error.includes('missing'), true)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 0)
    })

    // Test: password too short
    test('POST /api/users fails with short password', async () => {
        const invalidUser = {
            username: 'ShortPwd',
            name: 'Test',
            password: '12'
        }
        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error.includes('password is too short'), true)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, 0)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})
