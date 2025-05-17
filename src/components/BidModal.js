import React, { useState } from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Place Bid</h2>
        <div className="mb-4">
          <img src={meme.image_url} alt={meme.title} className="w-full h-40 object-cover rounded-lg mb-2" />
          <h3 className="font-semibold">{meme.title}</h3>
          <p className="text-sm text-gray-600">Current highest bid: {meme.highest_bid || 0} credits</p>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            min={meme.highest_bid ? meme.highest_bid + 1 : 1}
          />
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Place Bid
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

export default BidModal;