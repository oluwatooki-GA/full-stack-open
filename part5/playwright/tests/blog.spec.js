// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')
const {defaultUserInfo, loginUser, createNewBlogContent,createBlog,
    secondaryUserInfo, viewBlog, likeBlog, blogContents} = require("./helper");


describe('Blog app', () => {
    beforeEach(async ({ page,request }) => {
        await request.post('/api/testing/reset')

        await request.post('/api/users', {
            data: {
                name: defaultUserInfo.name,
                username: defaultUserInfo.username,
                password: defaultUserInfo.password,
            }
        })

        await request.post('/api/users', {
            data: {
                name: secondaryUserInfo.name,
                username: secondaryUserInfo.username,
                password: secondaryUserInfo.password,
            }
        })

        await page.goto('/')

    })

    test('Login form is shown', async ({ page }) => {
        const loginForm  = page.locator('#loginForm')
        await expect(loginForm).toBeVisible()
    })

    describe('Login', () => {

        test('succeeds with correct credentials', async ({ page }) => {
            await loginUser(page,defaultUserInfo.username,defaultUserInfo.password)
            await expect(page.getByText(`${defaultUserInfo.username} is logged in `)).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginUser(page,'Leo','DiCaprio')
            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginUser(page,defaultUserInfo.username,defaultUserInfo.password)
            await createBlog(page,createNewBlogContent.author,createNewBlogContent.title,createNewBlogContent.url)
        })

        test('a new blog can be created', async ({ page }) => {
            await expect(page.getByText(`${createNewBlogContent.title} ${createNewBlogContent.author}`)).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            const blogComponent = await likeBlog(page,createNewBlogContent.title,createNewBlogContent.author)
            await expect(blogComponent.locator('.blog-likes span')).toHaveText('likes: 1',)
        })

        test('the user who added the blog can delete the blog', async ({ page }) => {

            const blogComponent = await viewBlog(page,createNewBlogContent.title,createNewBlogContent.author)
            page.on('dialog', dialog => dialog.accept());
            await blogComponent.getByRole('button',{name:'remove'}).click()
            await expect(page.getByText(`Blog '${createNewBlogContent.title}' Successfully deleted`)).toBeVisible()
        })

        test("only the user who added the blog sees the blog's delete button", async ({ page }) => {
            await page.getByRole('button',{name:'logout'}).click()
            await loginUser(page,secondaryUserInfo.username,secondaryUserInfo.password)
            const blogComponent = await viewBlog(page,createNewBlogContent.title,createNewBlogContent.author)
            await expect(blogComponent.getByRole('button',{name:'remove'})).toBeVisible({visible:false})
        })

        test("the blogs are arranged in the order according to" +
            " the likes",async ({ page }) => {

            for (let blog of blogContents) {
                await createBlog(page,blog.author,blog.title,blog.url)
                await likeBlog(page,blog.title,blog.author,blog.wantedLikes)
            }
            await page.reload()
            const blogComponents = await page.locator('#blogList div').all()
            let likes = []
            for (let blog of blogComponents) {
                await blog.getByRole('button',{name:'view'}).click()
                const like = await blog.locator('.blog-likes span').textContent()
                likes.push(parseInt(like.replace('likes: ', ''), 10))
                await blog.getByRole('button',{name:'hide'}).click()
            }
            const likesSorted = likes.sort((a,b) => b.likes - a.likes)
            expect(likes).toEqual(likesSorted)
        })
    })
})