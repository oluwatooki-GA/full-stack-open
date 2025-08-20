import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";
import CreateBlogForm from "./components/CreateBlogForm.jsx";
import Togglable from "./components/Toggable.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState()
    const blogFormRef = useRef()


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
            blogService.setToken(user.token)
        }
    }, [])

    const createBlog = async  (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
    }

    const logout = () => {
      localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    return (
        <div>
            <h2>blogs</h2>
            {errorMessage && <p style={{color:'red', fontSize: 'large',border:'2px solid red',padding:10,fontWeight:'500'}}>{errorMessage}</p>}
            {notification && <p style={{color:'green', fontSize: 'large',border:'1px solid green',padding:10,fontWeight:'500'}}>{notification}</p>}

            { user ?
                <div>
                    {user.username} is logged in <button onClick={logout} >logout</button>
                </div> :
                <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
            }

            <h2>Create new</h2>
            { user &&
                <Togglable buttonLabel={'new note'} ref={blogFormRef}>
                    <CreateBlogForm createBlog={createBlog} setNotification={setNotification} setErrorMessage={setErrorMessage} />
                </Togglable> }
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
