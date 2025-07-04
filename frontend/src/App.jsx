import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"

import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { THEMES } from "./constants"
import { useEffect } from 'react';

import { Loader } from "lucide-react"

import { Toaster } from "react-hot-toast"

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()

  console.log({ onlineUsers });

  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div data-theme={theme}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
      <Toaster />

    </div>
  );
}

export default App;
