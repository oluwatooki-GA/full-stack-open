import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlogPost) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlogPost, config)
    return response.data
}

const updateLikes = async  (blogId,likes) => {
    const response = await axios.put(`${baseUrl}/${blogId}`,{likes})
    return response.data
}

export default { getAll, create,setToken, updateLikes }