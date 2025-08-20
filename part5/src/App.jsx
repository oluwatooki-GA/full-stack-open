import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            // noteService.setToken(user.token)
        }
    }, [])

    const logout = () => {
      localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>{errorMessage}</p>

            { user ?
                <div>
                    {user.username} is logged in <button onClick={logout} >logout</button>
                </div> :
                <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
            }
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
