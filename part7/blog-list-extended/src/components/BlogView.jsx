import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import blogService from '../services/blogs';

const BlogView = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
  });

  const addCommentMutation = useMutation({
    mutationFn: (comment) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', id]);
      setComment('');
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    addCommentMutation.mutate(comment);
  };

  if (isLoading) return <div>Loading blog...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="bg-white shadow rounded px-6 py-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{blog.title}</h2>
      <p className="mb-1"><span className="font-semibold">Author:</span> {blog.author}</p>
      <p className="mb-1"><span className="font-semibold">URL:</span> <a href={blog.url} className="text-blue-600 hover:underline">{blog.url}</a></p>
      <p className="mb-1"><span className="font-semibold">Likes:</span> {blog.likes}</p>
      <p className="mb-4"><span className="font-semibold">Added by:</span> {blog.user?.name || blog.user?.username || 'Unknown'}</p>
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {blog.comments && blog.comments.length > 0 ? (
        <ul className="mb-4 list-disc list-inside space-y-1">
          {blog.comments.map((c, i) => (
            <li key={i} className="bg-gray-100 rounded px-3 py-1">{c}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-gray-500">No comments yet.</p>
      )}
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button type="submit" disabled={addCommentMutation.isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add comment</button>
      </form>
      {addCommentMutation.isError && <p className="text-red-600 mt-2">Error adding comment.</p>}
    </div>
  );
};

export default BlogView;
