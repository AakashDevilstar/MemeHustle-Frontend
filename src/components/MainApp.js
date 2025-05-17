import { useState, useEffect } from 'react';
import { User, Trophy, Plus, TrendingUp } from 'lucide-react';

import CreateMemeModal from './CreateMemeModal';
import BidModal from './BidModal';
import MemeCard  from './MemeCard';
import api from '../services/api';

const MainApp = ({ userId = "demo_user", onLogout = () => {} }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-2xl border-r-4 border-amber-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-amber-800 mb-2">Meme Bazaar</h1>
              <p className="text-amber-600 text-sm italic">Where memes meet market</p>
            </div>
            
            <div className="flex items-center mb-8 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <User className="text-white" size={24} />
              </div>
              <div>
                <div className="font-bold text-amber-900 text-lg">{userId}</div>
                <div className="text-amber-700 font-semibold">{credits} credits</div>
              </div>
            </div>
            
            <nav className="space-y-3">
              <button
                onClick={() => setActiveTab('memes')}
                className={`w-full flex items-center px-6 py-4 rounded-lg text-left font-semibold transition-colors ${
                  activeTab === 'memes' 
                    ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' 
                    : 'hover:bg-amber-50 text-amber-700 border-2 border-transparent'
                }`}
              >
                <TrendingUp className="mr-4" size={24} />
                All Memes
              </button>
              
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`w-full flex items-center px-6 py-4 rounded-lg text-left font-semibold transition-colors ${
                  activeTab === 'leaderboard' 
                    ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' 
                    : 'hover:bg-amber-50 text-amber-700 border-2 border-transparent'
                }`}
              >
                <Trophy className="mr-4" size={24} />
                Leaderboard
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full flex items-center px-6 py-4 rounded-lg text-left font-semibold hover:bg-amber-50 text-amber-700 border-2 border-transparent transition-colors"
              >
                <Plus className="mr-4" size={24} />
                Create Meme
              </button>
            </nav>
            
            <button
              onClick={onLogout}
              className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold border-2 border-red-400"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-2">
              {activeTab === 'memes' ? 'Meme Gallery' : 'Hall of Fame'}
            </h1>
            <p className="text-amber-600 text-lg italic">
              {activeTab === 'memes' ? 'Discover and trade the finest memes' : 'The most legendary memes of all time'}
            </p>
          </div>

          {activeTab === 'memes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="bg-white rounded-xl shadow-2xl border-2 border-amber-200">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-amber-800">🏆 Top Memes</h2>
                <div className="space-y-4">
                  {leaderboard.map((meme, index) => (
                    <div key={meme.id} className="flex items-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-100 hover:border-amber-200 transition-colors">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full mr-6 font-bold text-lg">
                        {index + 1}
                      </div>
                      <img src={meme.image_url} alt={meme.title} className="w-20 h-20 object-cover rounded-lg mr-6 border-2 border-amber-200" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-amber-900">{meme.title}</h3>
                        <p className="text-amber-700 font-semibold">{meme.upvotes} upvotes</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-amber-800">{meme.highest_bid || 0} credits</div>
                        <div className="text-amber-600 font-semibold">highest bid</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-800 text-white py-6 mt-8">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <p className="font-semibold">Meme Bazaar © 2025</p>
              <p className="text-amber-200">Where creativity meets commerce</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">Created by @Aakash Raturi</p>
              <p className="text-amber-200 text-sm">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </footer>

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