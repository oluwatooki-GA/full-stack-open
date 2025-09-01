import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/users';

const User = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersService.getById(id),
  });

  if (isLoading) return <div>Loading user...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="bg-white shadow rounded px-6 py-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{user.name} <span className="text-gray-600">({user.username})</span></h2>
      <h3 className="text-xl font-semibold mb-2">Added blogs</h3>
      {user.blogs && user.blogs.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {user.blogs.map(blog => (
            <li key={blog.id} className="bg-gray-100 rounded px-3 py-1">{blog.title} <span className="text-gray-500">by {blog.author}</span></li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No blogs added.</p>
      )}
    </div>
  );
};

export default User;
