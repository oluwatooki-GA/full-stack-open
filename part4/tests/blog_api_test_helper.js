const Blog = require('../models/blog')
const initialBlogPosts = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Dan Abramov',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
]
const newBlogPost = {
    title: 'New Blog Post',
    author: 'Michael Chan',
    url: 'https://reactpat.com/',
    likes: 44,
}

const blogPostsInDb = async () => {
    const blogPosts = await Blog.find({})
    return blogPosts.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogPosts,
    newBlogPost,
    blogPostsInDb
}