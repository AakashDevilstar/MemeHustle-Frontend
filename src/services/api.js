const API_BASE = 'https://meme-hustle-backend.vercel.app/api/leaderboard/api';

const api = {
  getMemes: async () => {
    const response = await fetch(`${API_BASE}/memes`);
    return response.json();
  },
  createMeme: async (memeData) => {
    const response = await fetch(`${API_BASE}/memes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memeData)
    });
    return response.json();
  },
  bidMeme: async (memeId, bidData) => {
    const response = await fetch(`${API_BASE}/memes/${memeId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData)
    });
    return response.json();
  },
  voteMeme: async (memeId, voteData) => {
    const response = await fetch(`${API_BASE}/memes/${memeId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteData)
    });
    return response.json();
  },
  getLeaderboard: async () => {
    const response = await fetch(`${API_BASE}/memes/leaderboard`);
    return response.json();
  },
  generateCaption: async (memeId) => {
    const response = await fetch(`${API_BASE}/memes/${memeId}/caption`, {
      method: 'POST'
    });
    return response.json();
  }
};

export default api;