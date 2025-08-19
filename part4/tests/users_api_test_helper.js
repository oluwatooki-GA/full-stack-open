
const User = require('../models/User')

const newUser=   {
    "username": "Hess",
    "name": "Tendon",
    'password': '123456'
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
}
module.exports = {

    newUser,
    usersInDb,
}