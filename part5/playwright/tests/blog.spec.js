// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

const {defaultUserInfo, loginUser, createNewBlogContent,createBlog, secondaryUserInfo} = require("./helper");

describe('Blog app', () => {
    beforeEach(async ({ page,request }) => {
        await request.post('http://localhost:3001/api/testing/reset')

        await request.post('http://localhost:3001/api/users', {
            data: {
                name: defaultUserInfo.name,
                username: defaultUserInfo.username,
                password: defaultUserInfo.password,
            }
        })

        await request.post('http://localhost:3001/api/users', {
            data: {
                name: secondaryUserInfo.name,
                username: secondaryUserInfo.username,
                password: secondaryUserInfo.password,
            }
        })


        await page.goto('http://localhost:5173')

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
            const blogText = page.getByText(`${createNewBlogContent.title} ${createNewBlogContent.author}`)
            const blogComponent = blogText.locator('..')
            await blogComponent.getByRole('button',{name:'view'}).click()
            await blogComponent.getByRole('button',{name:'like'}).click()
            await expect(blogComponent.locator('.blog-likes')).toHaveText('likes: 1 like',)
        })

        test('the user who added the blog can delete the blog', async ({ page }) => {
            const blogText = page.getByText(`${createNewBlogContent.title} ${createNewBlogContent.author}`)
            const blogComponent = blogText.locator('..')
            await blogComponent.getByRole('button',{name:'view'}).click()
            page.on('dialog', dialog => dialog.accept());
            await blogComponent.getByRole('button',{name:'remove'}).click()
            await expect(page.getByText(`Blog '${createNewBlogContent.title}' Successfully deleted`)).toBeVisible()
        })


    })
})