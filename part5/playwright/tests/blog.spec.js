// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

const {defaultUserInfo, loginUser} = require("./helper");

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
})