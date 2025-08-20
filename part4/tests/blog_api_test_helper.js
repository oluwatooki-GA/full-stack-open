const Blog = require('../models/blog')

const initialBlogPosts = [
    {
        title: 'React patterns',
        url: 'https://reactpatterns.com/',
    },
    {
        title: 'Go To Statement Considered Harmful',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    },
    {
        title: 'Canonical string reduction',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    },
]

const newBlogPost = {
    title: 'New Blog Post',
    url: 'https://reactpat.com/',
}

const blogWithoutLikes = {
    title: 'Blog Without Likes',
    url: 'https://nolikes.com/'
}

const blogMissingTitle = {
    url: 'https://example.com/',
}

const blogMissingUrl = {
    title: 'Missing URL',
}

const blogPostsInDb = async () => {
    const blogPosts = await Blog.find({})
    return blogPosts.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogPosts,
    newBlogPost,
    blogWithoutLikes,
    blogMissingTitle,
    blogMissingUrl,
    blogPostsInDb
}