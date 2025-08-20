import {useState} from "react";

const CreateBlogForm = ({ setNotification,setErrorMessage,createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        try {
            event.preventDefault()
            const newBlog = await createBlog({ title, author, url })
            setNotification(`New blog '${newBlog.title}' created!'`)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {

            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }
    return (
        <form onSubmit={handleCreateBlog}>
            <div>
                title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    type="author"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>

            <div>
                url
                <input
                    type="url"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    );
};

export default CreateBlogForm;