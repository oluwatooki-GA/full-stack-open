import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('form calls event handler with correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()

    const component = render(
        <CreateBlogForm
            createBlog={mockCreateBlog}
            setNotification={() => {}}
            setErrorMessage={() => {}}
        />
    )

    await user.type(component.container.querySelector('#title-input'),'React Testing')
    await user.type(component.container.querySelector('#author-input'), 'John Doe')
    await user.type(component.container.querySelector('#url-input'), 'http://reacttest.com')
    await user.click(screen.getByText('create'))


    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
        title: 'React Testing',
        author: 'John Doe',
        url: 'http://reacttest.com'
    })
})
