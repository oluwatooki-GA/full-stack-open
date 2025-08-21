import { useState } from 'react'
import blogService from '../services/blogs.js'
const Blog = ({ blog, setErrorMessage,username,setNotification,deleteBlog }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const handleUpdateLikes = async () => {
        try {
            await blogService.updateLikes(blog.id, likes + 1)
            setLikes(likes + 1)
        } catch (error) {
            setErrorMessage(error.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleDeleteBlog = async () => {
        try{
            if (window.confirm(`Remove blog ${blog.title}`)) {
                await deleteBlog(blog)
                setNotification(`Blog '${blog.title}' Successfully deleted`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.error || error.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

    }


    return (
        <div style={{ border:'2px solid black', padding:5,marginBottom:15 }}>
            <span className="blog-title-author">
                {blog.title} {blog.author}
            </span>
            <button onClick={() => setVisible(!visible)}>{ visible ? 'hide':'view' }</button>
            {visible && (
                <div>
                    <p className="blog-url">url: {blog.url}</p>
                    <p className="blog-likes">
                        likes: {likes} <button onClick={handleUpdateLikes}>like</button>
                    </p>
                    <p>username: {blog.user.username}</p>
                    {username === blog.user.username &&
                        <button style={{ background:'red',color:'white' }}
                            onClick={handleDeleteBlog}>remove</button> }
                </div>
            )}


        </div>
    )
}

export default Blog