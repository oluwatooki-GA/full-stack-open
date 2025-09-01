import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Togglable from './components/Toggable.jsx'
import blogs from './services/blogs'
import blog from './components/Blog'
import {useNotificationHandler, useNotifications} from "./NotificationsContext.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    const notifications = useNotifications()
    const notificationHandler = useNotificationHandler()
    useEffect(() => {
        const getBlogs = async () => {
            try {
                let initialBlogs = await blogService.getAll()
                initialBlogs = initialBlogs.sort((a,b) => b.likes - a.likes )
                setBlogs(initialBlogs)
            } catch(exception) {
                notificationHandler({id:`${Math.random()}`, content:exception?.response?.data?.error || exception.message,type:"error"})

            }

        }
        getBlogs()
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
        setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes ))
    }

    const deleteBlog = async  (blogObject) => {
        await blogService.deletePost(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }

    const logout = () => {
        localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    console.log(notifications)
    return (
        <div>
            <h2>blogs</h2>
            {notifications.length >0 &&
                notifications.map((notification) => (
                    <p key={notification.id} style={{ color:`${notification.type === 'success' ? 'green':'red'}`,
                        fontSize: 'large',border:`${notification.type === 'success' ? 'green':'red'}`,padding:10,fontWeight:'500' }}>
                        {notification.content}</p>
                ))
            }

            { user ?
                <div>
                    {user.username} is logged in <button onClick={logout} >logout</button>
                </div> :
                <LoginForm setUser={setUser} />
            }

            <h2>Create new</h2>
            { user &&
                <Togglable buttonLabel={'new Blog'} ref={blogFormRef}>
                    <CreateBlogForm createBlog={createBlog} />
                </Togglable> }

            <div id='blogList'>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}
                          username={user? user.username: null}/>
                )}
            </div>

        </div>
    )
}

export default App
