import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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