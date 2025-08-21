import { useState } from 'react'

const CreateBlogForm = ({ setNotification,setErrorMessage,createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        try {

            event.preventDefault()
            const newBlog = await createBlog({ title, author, url })
            setNotification(`New blog '${newBlog.title}' created!'`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {

            setErrorMessage(exception?.response?.data?.error || exception.message)

            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }
    return (
        <form onSubmit={handleCreateBlog}>
            <div>
                <label htmlFor="title-input">title</label>
                <input
                    id="title-input"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label htmlFor="author-input">author</label>
                <input
                    id="author-input"
                    type="author"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>

            <div>
                <label htmlFor="url-input">url</label>
                <input
                    id="url-input"
                    type="url"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit" >create</button>
        </form>
    )
}

export default CreateBlogForm