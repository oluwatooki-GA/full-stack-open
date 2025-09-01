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
        <form onSubmit={handleCreateBlog} className="bg-white shadow rounded px-6 py-6 border border-gray-200 flex flex-col gap-4 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-1">
                <label htmlFor="title-input" className="font-semibold text-gray-700">Title</label>
                <input
                    id="title-input"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="author-input" className="font-semibold text-gray-700">Author</label>
                <input
                    id="author-input"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="url-input" className="font-semibold text-gray-700">URL</label>
                <input
                    id="url-input"
                    type="url"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">Create</button>
        </form>
    )
}

export default CreateBlogForm