const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Blog = require("../models/blog");
const app = require("../app");

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash,
    })

    await newUser.save()
    response.status(201).json(newUser)

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

module.exports = usersRouter


