import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Navbar({ user }) {
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setShowProfile(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            SmartNotes
          </h1>
          <div className="hidden md:flex space-x-6 ml-8">
            <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
              All Notes
            </button>
            <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
              Recent
            </button>
            <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
              Favorites
            </button>
          </div>
        </div>

        {/* User profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded flex items-center justify-center text-white font-semibold text-sm">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:block text-white/80 font-medium">
              {user?.email?.split('@')[0] || 'User'}
            </span>
            <svg 
              className={`w-4 h-4 text-white/60 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 py-2 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-white font-medium">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-white/60 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}