import {useState} from "react";
import blogService from "../services/blogs.js"
const Blog = ({blog}) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const updateLikes = async () => {
        await blogService.updateLikes(blog.id, likes + 1)
        setLikes(likes + 1)
    }
    return (
        <div style={{ border:'2px solid black', padding:5,marginBottom:15 }}>
            {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{ visible ? 'hide':'view' }</button>
            {visible && (
                <div>
                    <p>url: {blog.url}</p>
                    <p>likes: {likes} <button onClick={updateLikes}>like</button></p>
                    <p>username: {blog.user.username}</p>
                </div>
            )}

        </div>
    );
};

export default Blog;