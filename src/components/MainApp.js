import { useState, useEffect } from 'react';
import { User, Trophy, Plus, TrendingUp } from 'lucide-react';

import CreateMemeModal from './CreateMemeModal';
import BidModal from './BidModal';
import MemeCard  from './MemeCard';
import api from '../services/api';

const MainApp = ({ userId, onLogout }) => {
  const [activeTab, setActiveTab] = useState('memes');
  const [memes, setMemes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [credits, setCredits] = useState(500);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);

  useEffect(() => {
    loadMemes();
    if (activeTab === 'leaderboard') {
      loadLeaderboard();
    }
  }, [activeTab]);

  const loadMemes = async () => {
    try {
      const data = await api.getMemes();
      setMemes(data);
    } catch (err) {
      console.error('Error loading memes:', err);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  const handleCreateMeme = async (memeData) => {
    try {
      await api.createMeme(memeData);
      loadMemes();
    } catch (err) {
      console.error('Error creating meme:', err);
    }
  };

  const handleBid = async (bidAmount) => {
    try {
      await api.bidMeme(selectedMeme.id, { credits: bidAmount, user_id: userId });
      setCredits(credits - bidAmount);
      loadMemes();
    } catch (err) {
      console.error('Error placing bid:', err);
    }
  };

  const handleVote = async (memeId, type) => {
    try {
      await api.voteMeme(memeId, { type });
      loadMemes();
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const handleGenerateCaption = async (memeId) => {
    try {
      await api.generateCaption(memeId);
      loadMemes();
    } catch (err) {
      console.error('Error generating caption:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <User className="text-white" size={20} />
            </div>
            <div>
              <div className="font-semibold">{userId}</div>
              <div className="text-sm text-gray-500">{credits} credits</div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('memes')}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                activeTab === 'memes' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="mr-3" size={20} />
              All Memes
            </button>
            
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                activeTab === 'leaderboard' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
              }`}
            >
              <Trophy className="mr-3" size={20} />
              Leaderboard
            </button>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center px-4 py-2 rounded-lg text-left hover:bg-gray-100"
            >
              <Plus className="mr-3" size={20} />
              Create Meme
            </button>
          </nav>
          
          <button
            onClick={onLogout}
            className="w-full mt-8 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'memes' ? 'All Memes' : 'Leaderboard'}
          </h1>
        </div>

        {activeTab === 'memes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map(meme => (
              <MemeCard
                key={meme.id}
                meme={meme}
                onBid={(meme) => {
                  setSelectedMeme(meme);
                  setShowBidModal(true);
                }}
                onVote={handleVote}
                onGenerateCaption={handleGenerateCaption}
                userId={userId}
              />
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Top Memes</h2>
              <div className="space-y-3">
                {leaderboard.map((meme, index) => (
                  <div key={meme.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full mr-4 font-bold">
                      {index + 1}
                    </div>
                    <img src={meme.image_url} alt={meme.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{meme.title}</h3>
                      <p className="text-sm text-gray-600">{meme.upvotes} upvotes</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{meme.highest_bid || 0} credits</div>
                      <div className="text-sm text-gray-500">highest bid</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateMemeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateMeme}
        userId={userId}
      />
      
      <BidModal
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
        onSubmit={handleBid}
        meme={selectedMeme}
      />
    </div>
  );
};

export default MainApp;