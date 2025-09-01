import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    return (
        <div className="bg-white shadow rounded px-4 py-3 border border-gray-200 hover:bg-blue-50 transition">
            <Link to={`/blogs/${blog.id}`} className="text-lg font-semibold text-blue-700 hover:underline">{blog.title}</Link>
        </div>
    )
}

export default Blog