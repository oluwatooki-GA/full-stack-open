const defaultUserInfo  = {
    'username':'mlang',
    'name':'mike lang',
    'password':'password'
}

const loginUser = async (page,username,password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button').click()
}

module.exports = {
    defaultUserInfo,
    loginUser
}