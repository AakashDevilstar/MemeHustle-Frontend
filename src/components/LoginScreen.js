import React, { useState,  } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleStart = () => {
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <TrendingUp className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Meme Trader</h1>
          <p className="text-gray-600">Trade memes, earn credits, dominate the market!</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g., user123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Starting Credits: 500</span>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            disabled={!userId.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Start Trading
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;