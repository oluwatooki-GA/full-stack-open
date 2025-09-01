import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {useNotificationHandler} from "../NotificationsContext.jsx";
const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const notificationHandler = useNotificationHandler()
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
            notificationHandler({id:`${Math.random() -9}`, content:exception?.response?.data?.error || exception.message,type:"error"})
        }
    }

    return (
        <form onSubmit={handleLogin} id='loginForm' className="bg-white shadow rounded px-6 py-6 border border-gray-200 flex flex-col gap-4 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">Login</button>
        </form>
    )
}

export default LoginForm