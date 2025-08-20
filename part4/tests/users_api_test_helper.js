const User = require('../models/User')
const bcrypt = require('bcryptjs')

const newUser = {
    username: 'Hess',
    name: 'Tendon',
    password: '123456'
}

const loginUser = { username: 'root', password: 'password' }

const addLoginUser = async () => {
    const passwordHash = await bcrypt.hash(loginUser.password, 10)
    const user = new User({ username: loginUser.username, passwordHash })
    await user.save()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    newUser,
    loginUser,
    addLoginUser,
    usersInDb
}