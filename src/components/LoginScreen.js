import React, { useState } from 'react';
import { TrendingUp, DollarSign, Crown, Star } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleStart = () => {
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 flex items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-orange-400 rounded-full opacity-20 animate-pulse delay-500"></div>

      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg border-4 border-amber-200 relative">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-24 h-24 rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-amber-300">
              <Crown className="text-white" size={36} />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
              <Star className="text-amber-800" size={16} />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-amber-800 mb-3 tracking-wide">
            Meme Bazaar
          </h1>
          <p className="text-amber-600 text-lg font-medium italic mb-2">
            "Where Memes Meet Majesty"
          </p>
          <p className="text-amber-700 text-base">
            Trade legendary memes, earn royal credits, and build your empire!
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Input Section */}
          <div className="relative">
            <label className="block text-lg font-bold text-amber-800 mb-3">
              Enter Your Noble Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Lord_Memer, Duke_Trader..."
                className="w-full px-6 py-4 border-3 border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 focus:outline-none text-amber-900 text-lg font-semibold placeholder-amber-400 bg-amber-50"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <TrendingUp className="text-amber-500" size={24} />
              </div>
            </div>
          </div>
          
          {/* Credits Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-3 border-green-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4 border-2 border-green-400">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-green-800 font-bold text-lg">Royal Treasury</p>
                  <p className="text-green-600 font-medium">Starting Credits: 500</p>
                </div>
              </div>
              <div className="text-green-700 font-bold text-2xl">💰</div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎭</div>
              <p className="text-amber-800 font-semibold text-sm">Trade Memes</p>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-amber-800 font-semibold text-sm">Earn Glory</p>
            </div>
          </div>
          
          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!userId.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-amber-400 disabled:hover:scale-100"
          >
            <span className="flex items-center justify-center">
              <Crown className="mr-3" size={24} />
              Enter the Bazaar
              <Crown className="ml-3" size={24} />
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-amber-600 text-sm font-medium">
            Crafted with excellence by
          </p>
          <p className="text-amber-800 font-bold text-lg">
            @Aakash Raturi
          </p>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-amber-400 rounded-full"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-amber-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginScreen;