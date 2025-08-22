const defaultUserInfo  = {
    'username':'mlang',
    'name':'mike lang',
    'password':'password'
}

const secondaryUserInfo  = {
    'username':'A. Levy',
    'name':'Angstrom Levy',
    'password':'password is password'
}

const createNewBlogContent = {
    author:'Eren',
    title:'The rumbling',
    url:'https://example.com/new-blog',
}

const loginUser = async (page,username,password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button').click()
}

const createBlog = async(page,author,title,url) => {
    await page.getByText('new Blog').click()
    await page.getByLabel('author').fill(author)
    await page.getByLabel('title').fill(title)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

module.exports = {
    defaultUserInfo,
    secondaryUserInfo,
    loginUser,
    createNewBlogContent,
    createBlog
}