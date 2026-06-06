// components/forms/PostForm.jsx - فرم اختصاصی برای مقاله
import { useState, useEffect } from 'react';

const PostForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    author: '',
    ...initialData
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-2">عنوان مقاله</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-300 mb-2">محتوا</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm text-gray-300 mb-2">نویسنده</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
          required
        />
      </div>

      <button type="submit" className="hidden">Submit</button>
    </form>
  );
};

export default PostForm;