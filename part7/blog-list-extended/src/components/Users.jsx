import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import usersService from '../services/users';

const Users = () => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white shadow rounded px-6 py-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Users</h2>
      <table className="min-w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Username</th>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2"><Link to={`/users/${user.id}`} className="text-blue-700 hover:underline">{user.username}</Link></td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
