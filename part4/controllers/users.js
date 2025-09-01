const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password || !name) {
        response.status(400).send({'error':'missing username, or password or name'})
    }
    if (password.length < 3) {
        response.status(400).send({'error':'password is too short, it should be at least 3 characters long'})
    }

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
    const users = await User.find({}).populate('blogs',{title: 1, url:1,author:1})

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id).populate('blogs', { title: 1, url: 1, author: 1 });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.json(user);
    } catch (error) {
        response.status(400).json({ error: 'Malformed id' });
    }
});

module.exports = usersRouter
