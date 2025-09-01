import { useState } from 'react'
import {useNotificationHandler} from "../NotificationsContext.jsx";

const CreateBlogForm = ({createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const notificationHandler = useNotificationHandler()

    const handleCreateBlog = async (event) => {
        try {

            event.preventDefault()
            await createBlog({ title, author, url })
            notificationHandler({id:`${title}-${author}-${url} ${Math.random()}`,content:`Blog ${title} successfully created`,type:"success"})
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            notificationHandler({id:`${Math.random()}`, content:exception?.response?.data?.error || exception.message,type:"error"})
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