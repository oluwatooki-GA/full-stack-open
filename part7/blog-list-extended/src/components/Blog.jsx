import { useState } from 'react'
import blogService from '../services/blogs.js'
import {useNotificationHandler} from "../NotificationsContext.jsx";
const Blog = ({ blog,  username,deleteBlog, onLike }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const  notificationHandler = useNotificationHandler()
    const handleUpdateLikes = async () => {
        if (onLike) {
            onLike()
            setLikes(likes + 1)
            return
        }
        try {
            await blogService.updateLikes(blog.id, likes + 1)
            setLikes(likes + 1)
        } catch (exception) {
            notificationHandler({id:`${Math.random()}`, content:exception?.response?.data?.error || exception.message,type:"error"})

        }
    }


    const handleDeleteBlog = async () => {
        try{
            if (window.confirm(`Remove blog ${blog.title}`)) {
                await deleteBlog(blog)
                notificationHandler({id:` ${Math.random() +4}`,content:`Blog ${blog} successfully deleted`,type:"success"})

            }
        } catch (exception) {
            notificationHandler({id:`${Math.random()}`, content:exception?.response?.data?.error || exception.message,type:"error"})
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
                        <span>likes: {likes}</span> <button onClick={handleUpdateLikes}>like</button>
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