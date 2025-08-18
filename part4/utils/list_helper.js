const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => acc + cur.likes,0)
}

const favoriteBlog = (blogs) => {
    function reducer(acc,cur) {
        return  acc.likes > cur.likes ? acc : cur
    }
    if (blogs.length === 0) {
        return []
    }
    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let authorBlogs = {}
    blogs.forEach(blog => authorBlogs[blog.author]  =
        authorBlogs[blog.author] ? authorBlogs[blog.author] += 1  : authorBlogs[blog.author] = 1)
    const maxKey = Object.entries(authorBlogs).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    return {
        'author':maxKey,
        'blogs':authorBlogs[maxKey],
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let authorBlogs = {}

    blogs.forEach(blog => authorBlogs[blog.author]  =
        authorBlogs[blog.author] ? authorBlogs[blog.author] += blog.likes  : authorBlogs[blog.author] = blog.likes)
    const maxKey = Object.entries(authorBlogs).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    return {
        'author':maxKey,
        'likes':authorBlogs[maxKey],
    }


}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}