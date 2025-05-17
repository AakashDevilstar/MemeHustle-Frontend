import { Heart } from "lucide-react";

const getMainCaption = (captionString) => {
  try {
    const parsed = JSON.parse(captionString);
    return parsed.mainCaption || "Just another meme moment";
  } catch {
    return "Meme caption loading...";
  }
};

const MemeCard = ({ meme, onBid, onVote, onGenerateCaption, userId }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={meme.image_url}
          alt={meme.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {meme.upvotes || 0} ♥
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-2">{meme.title}</h3>
        {meme.caption && (
          <p className="text-amber-700 italic mb-4 text-sm">
            "{getMainCaption(meme.caption)}"
          </p>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500 fill-current" size={16} />
            <span className="text-amber-700 font-semibold">
              {meme.upvotes || 0}
            </span>
          </div>
          <div className="text-amber-700 font-semibold">
            Highest bid: {meme.highest_bid || 0} credits
          </div>
        </div>

        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => onVote(meme.id, "up")}
            className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-emerald-700 transition-colors font-semibold"
          >
            Upvote
          </button>
          <button
            onClick={() => onVote(meme.id, "down")}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-700 transition-colors font-semibold"
          >
            Downvote
          </button>
          <button
            onClick={() => onBid(meme)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors font-semibold"
          >
            Bid
          </button>
        </div>

        <button
          onClick={() => onGenerateCaption(meme.id)}
          className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-purple-700 transition-colors font-semibold"
        >
          Generate Caption
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
