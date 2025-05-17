import React, { useState,  } from 'react';

const CreateMemeModal = ({ isOpen, onClose, onSubmit, userId }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (title && imageUrl) {
      onSubmit({
        title,
        image_url: imageUrl,
        tags: tags.split(',').map(tag => tag.trim()),
        owner_id: userId
      });
      setTitle('');
      setImageUrl('');
      setTags('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Meme</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Meme Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
            >
              Create
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMemeModal;