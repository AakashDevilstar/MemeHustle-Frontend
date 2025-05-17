import React, { useState,  } from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-amber-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-800">Create New Meme</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Meme title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none text-amber-900"
          />
          
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none text-amber-900"
          />
          
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none text-amber-900"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMemeModal;