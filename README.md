# Meme Platform API

A React.js, Node.js/Express-based meme sharing and bidding platform with real-time features, AI-generated captions, and social voting functionality.

## Features

- **Meme Management**: Create, view, and manage memes with titles, images, and tags
- **Bidding System**: Users can bid credits on memes with real-time updates
- **Voting System**: Upvote/downvote memes with live vote counts
- **Leaderboard**: Top 10 memes ranked by upvotes
- **AI Captions**: Generate funny captions using Google's Gemini AI
- **Database Integration**: Supabase for data persistence

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **AI Service**: Google Gemini 1.5 Flash
- **Authentication**: User-based system with owner_id tracking

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

## MemeHustle UI
### Login Scrren
![image](https://github.com/user-attachments/assets/7dde38fa-1e6f-4f37-a810-1c18b92d4d68)

### AllMeme
![image](https://github.com/user-attachments/assets/03b71a43-1def-450a-9662-617049f93182)

### LeaderBoard
![image](https://github.com/user-attachments/assets/190e8484-9736-4ff0-b3d9-723ae77215a2)

### Create Meme
![image](https://github.com/user-attachments/assets/c1807a24-646a-4346-904e-874b9274a3f8)


## Project Structure
```bash
├── components/
│   ├── BidModal.js          # Bidding interface modal
│   ├── CreateMeme.js        # Meme creation form
│   ├── LoginScreen.js       # User authentication screen
│   ├── MainApp.js           # Main application container
│   └── MemeCard.js          # Individual meme display component
├── services/
│   └── App.js               # API service layer
├── App.js                   # Root application component
└── index.js                 # Application entry point

```

## Running in Development
```bash
npm run start
```
