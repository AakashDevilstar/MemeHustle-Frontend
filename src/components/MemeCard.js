import { Heart } from 'lucide-react';

const MemeCard = ({ meme, onBid, onVote, onGenerateCaption, userId }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={meme.image_url} alt={meme.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{meme.title}</h3>
        {meme.caption && (
          <p className="text-gray-600 text-sm mb-2 italic">"{meme.caption}"</p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500" size={16} />
            <span className="text-sm">{meme.upvotes || 0}</span>
          </div>
          <div className="text-sm text-gray-500">
            Highest bid: {meme.highest_bid || 0} credits
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onVote(meme.id, 'up')}
            className="flex-1 bg-green-500 text-white py-1 px-2 rounded text-sm hover:bg-green-600"
          >
            Upvote
          </button>
          <button
            onClick={() => onVote(meme.id, 'down')}
            className="flex-1 bg-red-500 text-white py-1 px-2 rounded text-sm hover:bg-red-600"
          >
            Downvote
          </button>
          <button
            onClick={() => onBid(meme)}
            className="flex-1 bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
          >
            Bid
          </button>
        </div>
        <button
          onClick={() => onGenerateCaption(meme.id)}
          className="w-full mt-2 bg-purple-500 text-white py-1 px-2 rounded text-sm hover:bg-purple-600"
        >
          Generate Caption
        </button>
      </div>
    </div>
  );
};

export default MemeCard;