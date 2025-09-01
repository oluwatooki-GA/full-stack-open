import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import Togglable from './components/Toggable.jsx'
import {useNotifications} from "./NotificationsContext.jsx";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { useUser } from './UserContext.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users.jsx';
import User from './components/User.jsx';
import BlogView from './components/BlogView.jsx';

const App = () => {
    const blogFormRef = useRef();
    const notifications = useNotifications();
    const queryClient = useQueryClient();
    const { user, dispatch } = useUser();
    const {isPending,data:blogs,isError,error} = useQuery({
        queryKey:['blogs'],
        queryFn:blogService.getAll,
    })

    // Blog creation mutation
    const createBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']);
        },
    });

    // Blog deletion mutation (optional, for completeness)
    const deleteBlogMutation = useMutation({
        mutationFn: (blogObject) => blogService.deletePost(blogObject.id),
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']);
        },
    });

    // Blog like mutation
    const likeBlogMutation = useMutation({
        mutationFn: ({ id, likes }) => blogService.updateLikes(id, likes),
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']);
        },
    });

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch({ type: 'INIT_FROM_STORAGE', payload: user });
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    const createBlog = async  (blogObject) => {
        blogFormRef.current.toggleVisibility();
        createBlogMutation.mutate(blogObject);
    }

    const deleteBlog = async  (blogObject) => {
        deleteBlogMutation.mutate(blogObject);
    }

    const handleLikeBlog = (blog) => {
        likeBlogMutation.mutate({ id: blog.id, likes: blog.likes + 1 });
    };

    const handleLogin = (userObj) => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userObj));
        dispatch({ type: 'LOGIN', payload: userObj });
        blogService.setToken(userObj.token);
    };

    const logout = () => {
        localStorage.removeItem('loggedBlogappUser');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <BrowserRouter>
            <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 mb-8 text-white shadow">
                <div className="flex gap-4 items-center">
                    <Link to="/" className="font-semibold hover:underline">Blogs</Link>
                    <Link to="/users" className="font-semibold hover:underline">Users</Link>
                </div>
                { user &&
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{user.username} is logged in</span>
                        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">logout</button>
                    </div>
                }
            </nav>
            <div className="max-w-2xl mx-auto px-4">
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Blogs</h2>
                        {notifications.length >0 &&
                            notifications.map((notification) => (
                                <p key={notification.id} className={`mb-2 px-4 py-2 rounded font-semibold border ${notification.type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
                                    {notification.content}</p>
                            ))
                        }
                        { !user && <LoginForm setUser={handleLogin} /> }
                        <h2 className="text-xl font-semibold mt-8 mb-2">Create new</h2>
                        { user &&
                            <Togglable buttonLabel={'new Blog'} ref={blogFormRef}>
                                <CreateBlogForm createBlog={createBlog} />
                            </Togglable> }
                        <div id='blogList' className="space-y-4 mt-6">
                            { !isPending ? blogs.map(blog =>
                                <Blog key={blog.id} blog={blog} />
                            ) : <h3 className="text-lg">Loading</h3>}
                            {isError && <p className="text-red-600">{error}</p>}
                        </div>
                    </div>
                } />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
