import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from "@testing-library/user-event";

test('<Blog /> renders title and author', () => {
    const blog = {
        title: 'Testing React components',
        author: 'Jane Doe',
        url: 'http://example.com',
        likes: 5,
        user: { username: 'janedoe' }
    }

    render(
        <Blog
            blog={blog}
            setErrorMessage={() => {}}
            username="janedoe"
            setNotification={() => {}}
            deleteBlog={() => {}}
        />
    )

    const titleAuthor = screen.getByText(/Testing React components Jane Doe/)
    expect(titleAuthor).toBeInTheDocument()

    expect(screen.queryByText(/url:/)).toBeNull()
    expect(screen.queryByText(/likes:/)).toBeNull()
})

test('URL and likes are shown when the view button is clicked', async () => {
    const blog = {
        title: 'Testing React components',
        author: 'Jane Doe',
        url: 'http://example.com',
        likes: 5,
        user: {username: 'janedoe'}
    }

    render(
        <Blog
            blog={blog}
            setErrorMessage={() => {
            }}
            username="janedoe"
            setNotification={() => {
            }}
        />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // URL and likes should now be visible
    expect(screen.getByText(/url: http:\/\/example.com/, {exact: false})).toBeInTheDocument()
    expect(screen.getByText(/likes: 5/,{ exact: false })).toBeInTheDocument()
})
