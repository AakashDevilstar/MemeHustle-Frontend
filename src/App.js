import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userId) => {
    setUser(userId);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <MainApp userId={user} onLogout={handleLogout} />;
};

export default App;