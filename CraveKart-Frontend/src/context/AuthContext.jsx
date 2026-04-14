import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const userDB = [
  { username: 'deepthi@gmail.com', password: '120' },
  { username: 'user@gmail.com', password: '123' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Mock authentication using userDB
    const user = userDB.find(u => u.username === username && u.password === password);
    if (user) {
      setUser({ username: user.username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};