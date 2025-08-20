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
    console.log(response)
    return response.data
}

export default { getAll, create,setToken }