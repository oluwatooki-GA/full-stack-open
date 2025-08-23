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

const blogContents = [
    {
        author:'Yinka',
        title:'Breaking Bread',
        url:'https://example.com/new-blog',
        wantedLikes:2
    },
    {
        author:'Pedro',
        title:'My anxiety is taking over me',
        url:'https://example.com/new-blog',
        wantedLikes:10
    },
    {
        author:'Steve',
        title:'I am STEVE',
        url:'https://example.com/new-blog',
        wantedLikes:6
    },
    {
        author:'Rick',
        title:'Portal Travel',
        url:'https://example.com/new-blog',
        wantedLikes:1
    }
]
const loginUser = async (page,username,password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button',{name:'login'}).click()
}

const createBlog = async(page,author,title,url) => {
    await page.getByRole('button',{name:'new Blog'}).click()
    await page.getByLabel('author').fill(author)
    await page.getByLabel('title').fill(title)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

const viewBlog = async(page,title,author) => {
    const blogText = page.getByText(`${title} ${author}`)
    const blogComponent = blogText.locator('..')
    await blogComponent.getByRole('button',{name:'view'}).click()
    return blogComponent
}

const likeBlog = async (page,title,author,times = 1) => {
    const blogText = page.getByText(`${title} ${author}`)
    const blogComponent = blogText.locator('..')
    await blogComponent.getByRole('button',{name:'view'}).click()

    for (let i = 0; i < times; i++) {
        await blogComponent.getByRole('button',{name:'like'}).click()
    }

    return blogComponent
}

module.exports = {
    defaultUserInfo,
    secondaryUserInfo,
    loginUser,
    createNewBlogContent,
    createBlog,
    viewBlog,
    likeBlog,
    blogContents,
}