import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}



const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlogPost) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlogPost, config)
    return response.data
}

const updateLikes = async  (blogId,likes) => {
    const response = await axios.put(`${baseUrl}/${blogId}`,{ likes })
    return response.data
}

const deletePost = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`,config)

}

export default { getAll, create,setToken, updateLikes,deletePost }