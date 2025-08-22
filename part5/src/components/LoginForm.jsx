import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
const LoginForm = ({ setUser,setErrorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={handleLogin} id='loginForm'>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>

            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>

            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm