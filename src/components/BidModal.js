import React, { useState } from 'react';
import { X } from 'lucide-react';

const BidModal = ({ isOpen, onClose, onSubmit, meme }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = () => {
    if (bidAmount && parseInt(bidAmount) > 0) {
      onSubmit(parseInt(bidAmount));
      setBidAmount('');
      onClose();
    }
  };

  if (!isOpen || !meme) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-amber-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-800">Place Your Bid</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <img src={meme.image_url} alt={meme.title} className="w-full h-32 object-cover rounded-lg mb-4 border-2 border-amber-100" />
          <h3 className="font-semibold text-lg text-amber-900">{meme.title}</h3>
          <p className="text-amber-700">Current highest bid: {meme.highest_bid || 0} credits</p>
        </div>
        
        <div className="mb-6">
          <input
            type="number"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-400 focus:outline-none text-amber-900"
            min={meme.highest_bid ? meme.highest_bid + 1 : 1}
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            Place Bid
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

export default BidModal;